import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Album } from 'src/albums/interfaces/album.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all favorites',
    description: 'Get all favorites artists, albums and tracks',
  })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async findAll() {
    return this.favoritesService.findAll();
  }

  @Post('album/:id')
  @ApiOperation({
    summary: 'Add album to the favorites',
    description: 'Add album to the favorites',
  })
  @ApiResponse({ status: 201, description: 'Added successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Album was not found.',
  })
  async addAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Album> {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @ApiOperation({
    summary: 'Delete album from favorites',
    description: 'Delete album from favorites',
  })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album was not found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbum(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({
    summary: 'Add artist to the favorites',
    description: 'Add artist to the favorites',
  })
  @ApiResponse({ status: 201, description: 'Added successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist was not found.',
  })
  async addArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Artist> {
    return this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @ApiOperation({
    summary: 'Delete artist from favorites',
    description: 'Delete artist from favorites',
  })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist was not found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtist(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    return this.favoritesService.removeArtist(id);
  }

  @Post('track/:id')
  @ApiOperation({
    summary: 'Add track to the favorites',
    description: 'Add track to the favorites',
  })
  @ApiResponse({ status: 201, description: 'Added successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Track was not found.',
  })
  async addTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<Track> {
    return this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @ApiOperation({
    summary: 'Delete track from favorites',
    description: 'Delete track from favorites',
  })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track was not found.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrack(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    return this.favoritesService.removeTrack(id);
  }
}
