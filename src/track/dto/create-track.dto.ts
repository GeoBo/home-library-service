import { Track } from './../entities/track.entity';
import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  //@ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @IsString()
  //@ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
