import { NotFoundException } from '@nestjs/common/exceptions';
import { FavsResponse } from './entities/favsResponse.entity';
import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { dbProvider } from 'src/db/db';

@Injectable()
export class FavsService {
  constructor(@Inject(dbProvider) private readonly db: dbProvider) {}

  findAll(): FavsResponse {
    console.log(this.db.favs.artists, this.db.favs.albums, this.db.favs.tracks);
    const favsResp = new FavsResponse({
      artists: [],
      albums: [],
      tracks: [],
    });

    this.db.favs.artists.forEach((id) => {
      const artist = this.db.artists.find((entity) => entity.id === id);
      if (artist) favsResp.artists.push(artist);
    });

    this.db.favs.albums.forEach((id) => {
      const album = this.db.albums.find((entity) => entity.id === id);
      if (album) favsResp.albums.push(album);
    });

    this.db.favs.tracks.forEach((id) => {
      const track = this.db.tracks.find((entity) => entity.id === id);
      if (track) favsResp.tracks.push(track);
    });

    return favsResp;
  }

  addTrack(id: string) {
    const track = this.db.tracks.find((entity) => entity.id === id);
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id: '${id}' not found`,
      );
    }
    if (this.db.favs.tracks.indexOf(id) !== -1) {
      throw new UnprocessableEntityException(
        `Track with id: '${id}' already exists in favorites`,
      );
    }
    this.db.favs.tracks.push(id);
    return { message: 'Track successfully added to favorites' };
  }

  removeTrack(id: string) {
    const trackIndex = this.db.favs.tracks.indexOf(id);
    if (trackIndex === -1) {
      throw new NotFoundException(
        `Track with id: '${id}' not found in favorites`,
      );
    }

    this.db.favs.tracks.splice(trackIndex, 1);
    return { message: 'Track successfully removed from favorites' };
  }

  addAlbum(id: string) {
    const album = this.db.albums.find((entity) => entity.id === id);
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id: '${id}' not found`,
      );
    }
    if (this.db.favs.albums.indexOf(id) !== -1) {
      throw new UnprocessableEntityException(
        `Album with id: '${id}' already exists in favorites`,
      );
    }
    this.db.favs.albums.push(id);
    return { message: 'Album successfully added to favorites' };
  }

  removeAlbum(id: string) {
    const albumIndex = this.db.favs.albums.indexOf(id);
    if (albumIndex === -1) {
      throw new NotFoundException(
        `Album with id: '${id}' not found in favorites`,
      );
    }

    this.db.favs.albums.splice(albumIndex, 1);
    return { message: 'Album successfully removed from favorites' };
  }

  addArtist(id: string) {
    const artist = this.db.artists.find((entity) => entity.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id: '${id}' not found`,
      );
    }
    if (this.db.favs.artists.indexOf(id) !== -1) {
      throw new UnprocessableEntityException(
        `Artist with id: '${id}' already exists in favorites`,
      );
    }
    this.db.favs.artists.push(id);
    return { message: 'Artist successfully added to favorites' };
  }

  removeArtist(id: string) {
    const artistIndex = this.db.favs.artists.indexOf(id);
    if (artistIndex === -1) {
      throw new NotFoundException(
        `Artist with id: '${id}' not found in favorites`,
      );
    }

    this.db.favs.artists.splice(artistIndex, 1);
    return { message: 'Artist successfully removed from favorites' };
  }
}
