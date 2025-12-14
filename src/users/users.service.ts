import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { HashService } from 'src/hash/hash.service';

type PrismaUser = Omit<User, 'createdAt' | 'updatedAt'> & {
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const password = await this.hashService.hashPassword(
      createUserDto.password,
    );
    const user = await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: password,
        version: 1,
      },
    });

    return this.userWithoutPassword(user);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => this.userWithoutPassword(user));
  }

  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userWithoutPassword(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<
    Omit<User, 'password'> & { createdAt: number; updatedAt: number }
  > {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordIsMatch = await this.hashService.comparePassword(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!passwordIsMatch) {
      throw new ForbiddenException('Old Password is wrong');
    }

    const newPassword = await this.hashService.hashPassword(
      updatePasswordDto.newPassword,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: newPassword,
        version: user.version + 1,
      },
    });

    return this.userWithoutPassword(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({ where: { id } });
  }

  private userWithoutPassword(
    user: PrismaUser,
  ): Omit<User, 'password'> & { createdAt: number; updatedAt: number } {
    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
