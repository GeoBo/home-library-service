export class Favs {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor(favs: Favs) {
    Object.assign(this, favs);
  }
}
