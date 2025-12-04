import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.create({
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

    await this.prisma.album.delete({ where: { id } });
  }
}
