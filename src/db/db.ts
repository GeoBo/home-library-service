import { Injectable } from '@nestjs/common';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class dbProvider {
  readonly users: User[] = [];
  readonly artists: Artist[] = [];
  readonly tracks: Track[] = [];
  //readonly albums: Album[] = [];
}
