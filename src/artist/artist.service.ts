import { DB } from 'src/db/db';
import { Artist } from './entities/artist.entity';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ArtistService {
  //private readonly artists: Artist[] = [];
  private readonly artists = new DB().artists;

  create({ name, grammy }: CreateArtistDto): Artist {
    const newArtist = new Artist({
      id: uuid(),
      name,
      grammy,
    });

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artistIndex = this.artists.findIndex((entity) => entity.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const changed = { ...this.artists[artistIndex], ...updateArtistDto };
    this.artists.splice(artistIndex, 1, changed);
    return changed;
  }

  remove(id: string) {
    const artistIndex = this.artists.findIndex((user) => user.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with id: ${id} not found`);
    }
    const deleted = this.artists[artistIndex];
    this.artists.splice(artistIndex, 1);
    return deleted;
  }
}
