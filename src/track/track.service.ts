import { DB } from './../db/db';
import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TrackService {
  private readonly db = new DB();

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    const newTrack = new Track({
      id: uuid(),
      name,
      artistId,
      albumId,
      duration,
    });

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.db.tracks;
  }

  findOne(id: string) {
    return `This action returns a #${id} track`;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: string) {
    return `This action removes a #${id} track`;
  }
}
