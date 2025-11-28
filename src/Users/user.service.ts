import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  create(dto: CreateUserDto): Partial<User> {
    const user: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.users.push(user);

    const { password, ...rest } = user;

    return rest;
  }

  update(id: string, dto: UpdatePasswordDto): Partial<User> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('Old Password is wrong');
    }

    user.password = dto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    const { password, ...rest } = user;
    return rest;
  }

  delete(id: string): void {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.users = this.users.filter((user) => user.id !== id);
  }
}
