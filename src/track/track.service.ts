import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { v4 as uuid } from 'uuid';
import { dbProvider } from 'src/db/db';

@Injectable()
export class TrackService {
  constructor(@Inject(dbProvider) private readonly db: dbProvider) {}

  create({ name, artistId, albumId, duration }: CreateTrackDto) {
    //Можно проверить наличие albumId и artistId в базе
    if (artistId) {
      const artist = this.db.artists.find((entity) => entity.id === artistId);
      if (!artist) {
        throw new BadRequestException(
          `Artist with id: '${artistId}' does not exist`,
        );
      }
    }

    // if (albumId) {
    //   const album = this.db.albums.find((entity) => entity.id === albumId);
    //   if (!album) {
    //     throw new BadRequestException(
    //       `Album with id: ${albumId} does not exist`,
    //     );
    //   }
    // }

    const newTrack = new Track({
      id: uuid(),
      name,
      artistId: artistId || null,
      albumId: albumId || null,
      duration,
    });

    this.db.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.db.tracks;
  }

  findOne(id: string): Track {
    const track = this.db.tracks.find((entity) => entity.id === id);
    if (!track) throw new NotFoundException(`User with id: ${id} not found`);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const trackIndex = this.db.tracks.findIndex((entity) => entity.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    const changed = { ...this.db.tracks[trackIndex], ...updateTrackDto };
    this.db.tracks.splice(trackIndex, 1, changed);
    return changed;
  }

  remove(id: string) {
    const trackIndex = this.db.tracks.findIndex((entity) => entity.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with id: ${id} not found`);
    }
    const deleted = this.db.tracks[trackIndex];
    this.db.tracks.splice(trackIndex, 1);
    return deleted;
  }
}
