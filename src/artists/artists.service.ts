import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return artist;
  }

  async findAll(): Promise<Artist[]> {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
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

  async remove(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.prisma.artist.delete({ where: { id } });
  }
}
