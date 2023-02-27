import { Artist } from './entities/artist.entity';
import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favs } from 'src/favs/entities/favs.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
    @InjectRepository(Favs) private readonly favs: Repository<Favs>,
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

    //Remove artistId in favorites
    const favs = (await this.favs.find())[0];
    const artistFavsIndex = favs.artists.indexOf(id);
    if (artistFavsIndex !== -1) {
      favs.artists.splice(artistFavsIndex, 1);
      await this.favs.save(favs);
    }
    return await this.artists.remove(artist);
  }
}
