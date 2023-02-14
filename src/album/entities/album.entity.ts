import { Artist } from 'src/artist/entities/artist.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, (artist) => artist, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artistId' })
  artist: Artist;

  @Column({ nullable: true })
  artistId: string | null;
}

// @Entity()
// export class Album {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column()
//   year: number;

//   @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'SET NULL' })
//   @JoinColumn({ name: 'artistId' })
//   artist: Artist;

//   @Column({ nullable: true })
//   artistId: string | null;

//   @OneToMany(() => Track, (track) => track.album)
//   tracks: Track[];
// }
