import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuid } from 'uuid';
import { dbProvider } from 'src/db/db';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(@Inject(dbProvider) private readonly db: dbProvider) {}

  create({ name, year, artistId }: CreateAlbumDto): Album {
    //check artist
    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    const newAlbum = new Album({
      id: uuid(),
      name,
      year,
      artistId: artistId || null,
    });

    this.db.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.db.albums;
  }

  findOne(id: string): Album {
    const album = this.db.albums.find((entity) => entity.id === id);
    if (!album) throw new NotFoundException(`Album with id: ${id} not found`);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const albumIndex = this.db.albums.findIndex((entity) => entity.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }

    //check artist
    const { artistId } = updateAlbumDto;
    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    const changed = { ...this.db.albums[albumIndex], ...updateAlbumDto };
    this.db.albums.splice(albumIndex, 1, changed);
    return changed;
  }

  remove(id: string): Album {
    const albumIndex = this.db.albums.findIndex((entity) => entity.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with id: ${id} not found`);
    }
    const deleted = this.db.albums[albumIndex];
    this.db.albums.splice(albumIndex, 1);

    //Reset albumId in tracks
    this.db.tracks
      .filter((entity) => (entity.albumId = id))
      .forEach((item) => (item.albumId = null));

    //Remove albumId in favorites
    const albumFavsIndex = this.db.favs.albums.indexOf(id);
    if (albumFavsIndex !== -1) this.db.favs.albums.splice(albumFavsIndex, 1);

    return deleted;
  }
}
