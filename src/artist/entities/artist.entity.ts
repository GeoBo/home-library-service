import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}

// @Entity()
// export class Artist {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @Column()
//   grammy: boolean;

//   @OneToMany(() => Album, (album) => album.artist)
//   albums: Album[];

//   @OneToMany(() => Track, (track) => track.artist)
//   tracks: Track[];
// }
