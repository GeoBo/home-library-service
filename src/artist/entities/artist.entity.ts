export class Artist {
  id: string;
  name: string;
  grammy: boolean;

  constructor(artist: Artist) {
    Object.assign(this, artist);
  }
}
