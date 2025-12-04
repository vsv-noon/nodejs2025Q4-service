import {
  // forwardRef,
  // Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
// import { TracksService } from 'src/tracks/tracks.service';
import { PrismaService } from 'src/prisma/prisma.service';
// import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  constructor(
    private readonly prisma: PrismaService,

    // @Inject(forwardRef(() => TracksService))
    // private readonly tracksService: TracksService,

    // @Inject(forwardRef(() => FavoritesService))
    // private readonly favoritesService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.prisma.album.create({
      data: { ...createAlbumDto },
    });

    return album;
  }

  async findAll(): Promise<Album[]> {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        ...updateAlbumDto,
      },
    });

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    // this.tracksService.removeAlbumId(id);

    // const favorite = this.favoritesService
    //   .findAll()
    //   .albums.find((album) => album.id === id);

    // if (favorite) {
    //   this.favoritesService.removeAlbum(id);
    // }

    await this.prisma.album.delete({ where: { id } });
  }

  removeArtistId(artistId: string): void {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
}
