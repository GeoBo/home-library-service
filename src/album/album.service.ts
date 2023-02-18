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
import { Favs } from 'src/favs/entities/favs.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album) private readonly albums: Repository<Album>,
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
    @InjectRepository(Favs) private readonly favs: Repository<Favs>,
  ) {}

  findAll(): Promise<Album[]> {
    return this.albums.find();
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    await this.checkArtist(createAlbumDto.artistId);
    const album = this.albums.create(createAlbumDto);
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
    return this.albums.save(album);
  }

  async remove(id: string): Promise<Album> {
    const album = await this.findOne(id);

    //Remove albumId in favorites
    const favs = (await this.favs.find())[0];
    const albumFavsIndex = favs.albums.indexOf(id);
    if (albumFavsIndex !== -1) {
      favs.albums.splice(albumFavsIndex, 1);
      await this.favs.save(favs);
    }
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
}
