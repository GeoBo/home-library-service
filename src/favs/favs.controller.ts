import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger/dist/decorators';
import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  HttpCode,
  Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@ApiTags('Favorites')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Gets all favorites movies, tracks and books',
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Track with id doesn't exist",
  })
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'Deleted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Album with id doesn't exist",
  })
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found.' })
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(201)
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiCreatedResponse({
    description: 'Added succesfully',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiUnprocessableEntityResponse({
    description: "Artist with id doesn't exist",
  })
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiNoContentResponse({ description: 'Deleted succesfully' })
  @ApiBadRequestResponse({
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Artist was not found.' })
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favsService.removeArtist(id);
  }
}
