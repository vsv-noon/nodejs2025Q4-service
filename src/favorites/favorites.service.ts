import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {
  private favAlbums: string[] = [];
  private favArtists: string[] = [];
  private favTracks: string[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,

    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  findAll() {
    const albums = this.favAlbums.map((albumId) =>
      this.albumsService.findAll().find((album) => album.id === albumId),
    );
    const artists = this.favArtists.map((artistId) =>
      this.artistsService.findAll().find((artist) => artist.id === artistId),
    );
    const tracks = this.favTracks.map((trackId) =>
      this.tracksService.findAll().find((track) => track.id === trackId),
    );

    return { albums, artists, tracks };
  }
}
