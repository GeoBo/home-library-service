import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Favs } from 'src/favs/entities/favs.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Album) private readonly albums: Repository<Album>,
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
    @InjectRepository(Track) private readonly tracks: Repository<Track>,
    @InjectRepository(Favs) private readonly favs: Repository<Favs>,
  ) {}

  findAll(): Promise<Track[]> {
    return this.tracks.find();
  }

  async create(CreateTrackDto: CreateTrackDto): Promise<Track> {
    await this.checkArtist(CreateTrackDto.artistId);
    await this.checkAlbum(CreateTrackDto.albumId);
    const track = this.tracks.create(CreateTrackDto);
    return this.tracks.save(track);
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.tracks.findOneBy({ id });
    if (!track) throw new NotFoundException(`Track with id: ${id} not found`);
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);
    await this.checkArtist(updateTrackDto.artistId);
    await this.checkAlbum(updateTrackDto.albumId);
    this.tracks.merge(track, updateTrackDto);
    return this.tracks.save(track);
  }

  async remove(id: string): Promise<Track> {
    const track = await this.findOne(id);

    //Remove trackId in favorites
    const favs = (await this.favs.find())[0];
    const trackFavsIndex = favs.tracks.indexOf(id);
    if (trackFavsIndex !== -1) {
      favs.tracks.splice(trackFavsIndex, 1);
      await this.favs.save(favs);
    }

    return await this.tracks.remove(track);
  }

  async checkArtist(id: string): Promise<void> {
    if (id) {
      const artist = await this.artists.findOneBy({ id });
      if (!artist) {
        throw new BadRequestException(`Artist with id: '${id}' does not exist`);
      }
    }
  }

  async checkAlbum(id: string): Promise<void> {
    if (id) {
      const album = await this.albums.findOneBy({ id });
      if (!album) {
        throw new BadRequestException(`Album with id: '${id}' does not exist`);
      }
    }
  }
}
