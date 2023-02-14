import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, (artist) => artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => Album, (album) => album, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'albumId' })
  album: Album;

  @Column({ nullable: true })
  albumId: string | null;

  @Column()
  duration: number;
}

// @Entity()
// export class Track {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @ManyToOne(() => Artist, (artist) => artist.tracks, { onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'artistId' })
//   artist: Artist;

//   @Column({ nullable: true })
//   artistId: string | null;

//   @ManyToOne(() => Album, (album) => album.tracks, { onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'albumId' })
//   album: Album;

//   @Column({ nullable: true })
//   albumId: string | null;

//   @Column()
//   duration: number;
// }
