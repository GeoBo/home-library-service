import { Artist } from './entities/artist.entity';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
  ) {}

  findAll(): Promise<Artist[]> {
    return this.artists.find();
  }

  create({ name, grammy }: CreateArtistDto): Promise<Artist> {
    const artist = this.artists.create({
      name,
      grammy,
    });

    return this.artists.save(artist);
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artists.findOneBy({ id });
    if (!artist) throw new NotFoundException(`Artist with id: ${id} not found`);
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    this.artists.merge(artist, updateArtistDto);
    return this.artists.save(artist);
  }

  async remove(id: string): Promise<Artist> {
    const artist = await this.findOne(id);
    return await this.artists.remove(artist);
  }

  // remove(id: string): Artist {
  //   const artistIndex = this.db.artists.findIndex((user) => user.id === id);
  //   if (artistIndex === -1) {
  //     throw new NotFoundException(`Artist with id: ${id} not found`);
  //   }
  //   const deleted = this.db.artists[artistIndex];
  //   this.db.artists.splice(artistIndex, 1);

  //   //Reset artistId in tracks
  //   this.db.tracks
  //     .filter((entity) => (entity.artistId = id))
  //     .forEach((item) => (item.artistId = null));

  //   //Remove artistId in favorites
  //   const artistFavsIndex = this.db.favs.artists.indexOf(id);
  //   if (artistFavsIndex !== -1) this.db.favs.albums.splice(artistFavsIndex, 1);

  //   return deleted;
  // }
}
