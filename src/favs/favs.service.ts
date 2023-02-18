import { Artist } from 'src/artist/entities/artist.entity';
import { NotFoundException } from '@nestjs/common/exceptions';
import { FavsResponse } from './entities/favsResponse.entity';
import {
  Injectable,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';
import { In, Repository } from 'typeorm';
import { Favs } from './entities/favs.entity';

@Injectable()
export class FavsService implements OnModuleInit {
  constructor(
    @InjectRepository(Album) private readonly albums: Repository<Album>,
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
    @InjectRepository(Track) private readonly tracks: Repository<Track>,
    @InjectRepository(Favs) private readonly favs: Repository<Favs>,
  ) {}

  async onModuleInit() {
    // await this.favs.query(`TRUNCATE FAVS RESTART IDENTITY CASCADE;`);
    const favs = await this.favs.find();
    // console.log(favs);
    if (favs.length) return;
    const newFavs = this.favs.create({
      artists: [],
      albums: [],
      tracks: [],
    });
    await this.favs.save(newFavs);
  }

  async findAll(): Promise<FavsResponse> {
    const favs = (await this.favs.find())[0];
    const artists = await this.artists.findBy({ id: In(favs.artists) });
    const albums = await this.albums.findBy({ id: In(favs.albums) });
    const tracks = await this.tracks.findBy({ id: In(favs.tracks) });
    // console.log(favs);
    const favsResp = new FavsResponse({
      artists,
      albums,
      tracks,
    });

    return favsResp;
  }

  async addTrack(id: string) {
    const track = await this.tracks.findOneBy({ id });
    if (!track) {
      throw new UnprocessableEntityException(
        `Track with id: '${id}' not found`,
      );
    }
    const favs = (await this.favs.find())[0];
    if (favs.tracks.indexOf(id) !== -1) {
      throw new UnprocessableEntityException(
        `Track with id: '${id}' already exists in favorites`,
      );
    }
    favs.tracks.push(id);
    await this.favs.save(favs);
    return { message: 'Track successfully added to favorites' };
  }

  async removeTrack(id: string) {
    const favs = (await this.favs.find())[0];
    const trackIndex = favs.tracks.indexOf(id);
    if (trackIndex === -1) {
      throw new NotFoundException(
        `Track with id: '${id}' not found in favorites`,
      );
    }

    favs.tracks.splice(trackIndex, 1);
    await this.favs.save(favs);
    return { message: 'Track successfully removed from favorites' };
  }

  async addAlbum(id: string) {
    const album = await this.albums.findOneBy({ id });
    if (!album) {
      throw new UnprocessableEntityException(
        `Album with id: '${id}' not found`,
      );
    }
    const favs = (await this.favs.find())[0];
    if (favs.albums.indexOf(id) !== -1) {
      throw new UnprocessableEntityException(
        `Album with id: '${id}' already exists in favorites`,
      );
    }
    favs.albums.push(id);
    await this.favs.save(favs);
    return { message: 'Album successfully added to favorites' };
  }

  async removeAlbum(id: string) {
    const favs = (await this.favs.find())[0];
    const albumIndex = favs.albums.indexOf(id);
    if (albumIndex === -1) {
      throw new NotFoundException(
        `Album with id: '${id}' not found in favorites`,
      );
    }

    favs.albums.splice(albumIndex, 1);
    await this.favs.save(favs);
    return { message: 'Album successfully removed from favorites' };
  }

  async addArtist(id: string) {
    const artist = await this.artists.findOneBy({ id });
    if (!artist) {
      throw new UnprocessableEntityException(
        `Artist with id: '${id}' not found`,
      );
    }
    const favs = (await this.favs.find())[0];
    if (favs.artists.indexOf(id) !== -1) {
      throw new UnprocessableEntityException(
        `Artist with id: '${id}' already exists in favorites`,
      );
    }
    favs.artists.push(id);
    await this.favs.save(favs);
    return { message: 'Artist successfully added to favorites' };
  }

  async removeArtist(id: string) {
    const favs = (await this.favs.find())[0];
    const artistIndex = favs.artists.indexOf(id);
    if (artistIndex === -1) {
      throw new NotFoundException(
        `Artist with id: '${id}' not found in favorites`,
      );
    }

    favs.artists.splice(artistIndex, 1);
    await this.favs.save(favs);
    return { message: 'Artist successfully removed from favorites' };
  }
}
