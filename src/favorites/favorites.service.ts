import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';

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

  addAlbum(id: string): Album {
    const album = this.albumsService.findAll().find((album) => album.id === id);

    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    this.favAlbums.push(album.id);

    return album;
  }

  removeAlbum(id: string): void {
    const albumIdx = this.favAlbums.findIndex((idx) => idx === id);

    if (albumIdx === -1) {
      throw new NotFoundException('Album not found');
    }

    this.favAlbums.splice(albumIdx, 1);
  }

  addArtist(id: string): Artist {
    const artist = this.artistsService
      .findAll()
      .find((artist) => artist.id === id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    this.favArtists.push(artist.id);

    return artist;
  }

  removeArtist(id: string): void {
    const artistIdx = this.favArtists.findIndex((idx) => idx === id);

    if (artistIdx === -1) {
      throw new NotFoundException('Artist not found');
    }

    this.favArtists.splice(artistIdx, 1);
  }

  addTrack(id: string): Track {
    const track = this.tracksService.findAll().find((track) => track.id === id);

    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    this.favTracks.push(track.id);

    return track;
  }

  removeTrack(id: string): void {
    const trackIdx = this.favTracks.findIndex((idx) => idx === id);

    if (trackIdx === -1) {
      throw new NotFoundException('Track not found');
    }

    this.favTracks.splice(trackIdx, 1);
  }
}
