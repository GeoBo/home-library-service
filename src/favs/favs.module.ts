import { Favs } from 'src/favs/entities/favs.entity';
import { Track } from './../track/entities/track.entity';
import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { Album } from 'src/album/entities/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';

@Module({
  controllers: [FavsController],
  providers: [FavsService],
  imports: [TypeOrmModule.forFeature([Album, Artist, Track, Favs])],
})
export class FavsModule {}
