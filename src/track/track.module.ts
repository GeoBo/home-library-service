import { Album } from 'src/album/entities/album.entity';
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from './entities/track.entity';
import { Favs } from 'src/favs/entities/favs.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([Track, Artist, Album, Favs])],
})
export class TrackModule {}
