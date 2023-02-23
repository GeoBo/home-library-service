import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger/dist';
import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger/dist/decorators';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single album by id',
    description: 'Gets single album by id',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Album was not found' })
  @ApiNoContentResponse({ description: 'The album has been deleted' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumService.remove(id);
  }
}
