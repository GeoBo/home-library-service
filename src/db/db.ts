import { Track } from './../track/entities/track.entity';
import { Artist } from './../artist/entities/artist.entity';
import { User } from './../user/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DB {
  readonly users: User[] = [];
  readonly artists: Artist[] = [];
  readonly tracks: Track[] = [];
}
