import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  @ValidateIf((o, value) => value !== undefined && value !== null)
  artistId: string | null; // refers to Artist

  @IsUUID()
  @ValidateIf((o, value) => value !== undefined && value !== null)
  albumId: string | null; // refers to Album

  @IsNotEmpty()
  @IsInt()
  duration: number; // integer number
}
