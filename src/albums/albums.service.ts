import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
// import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { TracksService } from 'src/tracks/tracks.service';
// import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    // @Inject(forwardRef(() => FavoritesService))
    // private readonly favoritesService: FavoritesService,
  ) {}

  create(createAlbumDto: CreateAlbumDto): Album {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.albums.push(album);

    return album;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  // update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
  //   const album = this.albums.find((album) => album.id === id);

  //   if (!album) {
  //     throw new NotFoundException('Album not found');
  //   }

  //   album.name = updateAlbumDto.name;
  //   album.year = updateAlbumDto.year;
  //   album.artistId = updateAlbumDto.artistId;

  //   return album;
  // }

  remove(id: string): void {
    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    this.tracksService.removeAlbumId(id);

    // const favorite = this.favoritesService
    //   .findAll()
    //   .albums.find((album) => album.id === id);

    // if (favorite) {
    //   this.favoritesService.removeAlbum(id);
    // }

    this.albums = this.albums.filter((album) => album.id !== id);
  }

  removeArtistId(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
