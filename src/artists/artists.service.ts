import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { AlbumsService } from 'src/albums/albums.service';
import { TracksService } from 'src/tracks/tracks.service';
// import { FavoritesService } from 'src/favorites/favorites.service';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,

    // @Inject(forwardRef(() => FavoritesService))
    // private readonly favoritesService: FavoritesService,
  ) {}

  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(artist);

    return artist;
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const updatedUser = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return updatedUser;
  }

  async remove(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    this.albumService.removeArtistId(id);
    this.tracksService.removeArtistId(id);

    // const favorite = this.favoritesService
    //   .findAll()
    //   .artists.find((artist) => artist.id === id);

    // if (favorite) {
    //   this.favoritesService.removeArtist(id);
    // }

    this.prisma.artist.delete({ where: { id } });
  }
}
