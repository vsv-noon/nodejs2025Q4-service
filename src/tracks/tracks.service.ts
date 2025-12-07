import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TracksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.prisma.track.create({
      data: { ...createTrackDto },
    });

    return track;
  }

  async findAll(): Promise<Track[]> {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track ${id} not found`);
    }

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException(`Track not found`);
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });

    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.prisma.track.delete({ where: { id } });
  }
}
