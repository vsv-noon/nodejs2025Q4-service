import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const albums = await this.prisma.album.findMany({
      where: { isFavorite: true },
    });
    const artists = await this.prisma.artist.findMany({
      where: { isFavorite: true },
    });
    const tracks = await this.prisma.track.findMany({
      where: { isFavorite: true },
    });

    return {
      albums: this.favorites(albums),
      artists: this.favorites(artists),
      tracks: this.favorites(tracks),
    };
  }

  favorites(array: Album[] | Artist[] | Track[]) {
    const excludeField = (object: Record<string, any>, keys: string[]) => {
      return Object.fromEntries(
        Object.entries(object).filter(([key]) => !keys.includes(key)),
      );
    };

    return array.map((item: Record<string, any>) =>
      excludeField(item, ['isFavorite']),
    );
  }

  async addAlbum(id: string): Promise<Album> {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: { isFavorite: true },
      });
      return album;
    } catch (error) {
      throw new UnprocessableEntityException('Album not found');
    }
  }

  async removeAlbum(id: string): Promise<Album> {
    try {
      const album = await this.prisma.album.update({
        where: { id },
        data: { isFavorite: false },
      });
      return album;
    } catch (error) {
      throw new NotFoundException('Album not found');
    }
  }

  async addArtist(id: string): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: true },
      });
      return artist;
    } catch (error) {
      throw new UnprocessableEntityException('Artist not found');
    }
  }

  async removeArtist(id: string): Promise<Artist> {
    try {
      const artist = await this.prisma.artist.update({
        where: { id },
        data: { isFavorite: false },
      });
      return artist;
    } catch (error) {
      throw new NotFoundException('Artist not found');
    }
  }

  async addTrack(id: string): Promise<Track> {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: { isFavorite: true },
      });
      return track;
    } catch (error) {
      throw new UnprocessableEntityException('Track not found');
    }
  }

  async removeTrack(id: string): Promise<Track> {
    try {
      const track = await this.prisma.track.update({
        where: { id },
        data: { isFavorite: false },
      });
      return track;
    } catch (error) {
      throw new NotFoundException('Track not found');
    }
  }
}
