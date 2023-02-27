import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

export class FavsResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];

  constructor(favsResponse: FavsResponse) {
    Object.assign(this, favsResponse);
  }
}
