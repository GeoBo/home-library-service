import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { DB } from './db/db';
import { TrackModule } from './track/track.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule],
  controllers: [AppController],
  providers: [AppService, DB],
})
export class AppModule {}
