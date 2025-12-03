/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class UsersService {
  // private users: User[] = [];
  constructor(private readonly prisma: PrismaService) {}

  // create(createUserDto: CreateUserDto): Partial<User> {
  //   const user: User = {
  //     id: uuidv4(),
  //     login: createUserDto.login,
  //     password: createUserDto.password,
  //     version: 1,
  //     createdAt: Date.now(),
  //     updatedAt: Date.now(),
  //   };

  //   this.users.push(user);

  //   const { password, ...rest } = user;

  //   return rest;
  // }

  async create(createUserDto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const { password, ...rest } = user;

    return {
      ...rest,
      createdAt: new Date(rest.createdAt).getTime(),
      updatedAt: new Date(rest.updatedAt).getTime(),
    };
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
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

  // update(id: string, updatePasswordDto: UpdatePasswordDto): Partial<User> {
  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   if (updatePasswordDto.oldPassword !== user.password) {
  //     throw new ForbiddenException('Old Password is wrong');
  //   }

  //   user.password = updatePasswordDto.newPassword;
  //   user.updatedAt = Date.now();
  //   user.version += 1;

  //   const { password, ...rest } = user;
  //   return rest;
  // }

  // remove(id: string): void {
  //   const user = this.users.find((user) => user.id === id);

  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   this.users = this.users.filter((user) => user.id !== id);
  // }
}
