import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const timestamp = new Date();
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        version: 1,
        createdAt: timestamp,
        updatedAt: timestamp,
      },
    });

    const newUser: Omit<User, 'password'> = {
      id: user.id,
      login: user.login,
      version: 1,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.createdAt).getTime(),
    };

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    }));
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updatePasswordDto.oldPassword !== user.password) {
      throw new ForbiddenException('Old Password is wrong');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
        updatedAt: new Date(),
      },
    });

    const userWithoutPassword: Omit<User, 'password'> = {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: new Date(updatedUser.createdAt).getTime(),
      updatedAt: new Date(updatedUser.createdAt).getTime(),
    };

    return userWithoutPassword;
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
