import { Artist } from './entities/artist.entity';
import { Inject, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';
import { dbProvider } from 'src/db/db';

@Injectable()
export class ArtistService {
  constructor(@Inject(dbProvider) private readonly db: dbProvider) {}

  create({ name, grammy }: CreateArtistDto): Artist {
    const newArtist = new Artist({
      id: uuid(),
      name,
      grammy,
    });

    this.db.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.db.artists;
  }

  findOne(id: string): Artist {
    const artist = this.db.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artistIndex = this.db.artists.findIndex((entity) => entity.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const changed = { ...this.db.artists[artistIndex], ...updateArtistDto };
    this.db.artists.splice(artistIndex, 1, changed);
    return changed;
  }

  remove(id: string): Artist {
    const artistIndex = this.db.artists.findIndex((user) => user.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const deleted = this.db.artists[artistIndex];
    this.db.artists.splice(artistIndex, 1);

    //Reset artistId in tracks
    this.db.tracks
      .filter((entity) => (entity.artistId = id))
      .forEach((item) => (item.artistId = null));

    //Remove artistId in favorites
    const artistFavsIndex = this.db.favs.artists.indexOf(id);
    if (artistFavsIndex !== -1) this.db.favs.albums.splice(artistFavsIndex, 1);

    return deleted;
  }
}
