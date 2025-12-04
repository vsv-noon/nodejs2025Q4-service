import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Album')
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @ApiOperation({
    summary: 'Add new album',
    description: 'Add new album information',
  })
  @ApiResponse({ status: 201, description: 'Album is created' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
    return await this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get albums list',
    description: 'Gets all library albums list',
  })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async findAll(): Promise<Album[]> {
    return await this.albumsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get albums list' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({ status: 404, description: 'Album not found' })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Album> {
    return await this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update album information',
    description: 'Update library album information by UUID',
  })
  @ApiResponse({ status: 200, description: 'The album has been updated.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete album',
    description: 'Delete album from library',
  })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(204)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    await this.albumsService.remove(id);
  }
}
