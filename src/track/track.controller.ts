import {
  ApiBadRequestResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new track',
    description: 'Add new track information',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get single track by id',
    description: 'Get single track by id',
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. body does not contain required fields',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update track information',
    description: 'Update library track information by UUID',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({
    summary: 'Delete track',
    description: 'Delete track from library',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiNotFoundResponse({ description: 'Track was not found.' })
  @ApiNoContentResponse({ description: 'The track has been deleted' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.trackService.remove(id);
  }
}
