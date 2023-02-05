import { Injectable } from '@nestjs/common';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { User } from '../user/entities/user.entity';
import { Album } from 'src/album/entities/album.entity';
import { Favs } from 'src/favs/entities/favs.entity';

@Injectable()
export class dbProvider {
  readonly users: User[] = [];
  readonly artists: Artist[] = [];
  readonly tracks: Track[] = [];
  readonly albums: Album[] = [];
  readonly favs: Favs = {
    artists: [],
    albums: [],
    tracks: [],
  };
}
