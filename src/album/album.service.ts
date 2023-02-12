import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly albums: Repository<Album>,
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
  ) {}

  findAll(): Promise<Album[]> {
    return this.albums.find();
  }

  async create({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    await this.checkArtist(artistId);
    const album = this.albums.create({
      name,
      year,
      artistId,
    });

    return this.albums.save(album);
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albums.findOneBy({ id });
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);
    await this.checkArtist(updateAlbumDto.artistId);

    this.albums.merge(album, updateAlbumDto);
    return this.artists.save(album);
  }

  async remove(id: string): Promise<Album> {
    const album = await this.findOne(id);
    return await this.albums.remove(album);
  }

  async checkArtist(id: string): Promise<void> {
    if (id) {
      const artist = await this.artists.findOneBy({ id });
      if (!artist) {
        throw new BadRequestException(`Artist with id: '${id}' does not exist`);
      }
    }
  }

  // remove(id: string): Album {
  //   const albumIndex = this.db.albums.findIndex((entity) => entity.id === id);
  //   if (albumIndex === -1) {
  //     throw new NotFoundException(`Album with id: ${id} not found`);
  //   }
  //   const deleted = this.db.albums[albumIndex];
  //   this.db.albums.splice(albumIndex, 1);

  //   //Reset albumId in tracks
  //   this.db.tracks
  //     .filter((entity) => (entity.albumId = id))
  //     .forEach((item) => (item.albumId = null));

  //   //Remove albumId in favorites
  //   const albumFavsIndex = this.db.favs.albums.indexOf(id);
  //   if (albumFavsIndex !== -1) this.db.favs.albums.splice(albumFavsIndex, 1);

  //   return deleted;
  // }
}
