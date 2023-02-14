import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favs {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('simple-array')
  artists: string[];

  @Column('simple-array')
  albums: string[];

  @Column('simple-array')
  tracks: string[];
}

// @Entity()
// export class Favs {
//   @PrimaryGeneratedColumn('uuid')
//   id?: string;

//   @JoinTable()
//   @ManyToMany(() => Artist, { onDelete: 'CASCADE', eager: true })
//   artists: Artist[];

//   @JoinTable()
//   @ManyToMany(() => Album, { onDelete: 'CASCADE', eager: true })
//   albums: Album[];

//   @JoinTable()
//   @ManyToMany(() => Track, { onDelete: 'CASCADE', eager: true })
//   tracks: Track[];
// }
