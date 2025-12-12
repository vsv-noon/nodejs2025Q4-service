import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import { HashService } from 'src/hash/hash.service';
import { AuthEntity } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hash: HashService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create({
      ...createUserDto,
    });

    console.log('New User');

    return newUser;
  }

  async login(loginDto: LoginDto): Promise<AuthEntity> {
    const user = await this.prisma.user.findFirst({
      where: { login: loginDto.login },
    });

    if (!user) {
      throw new NotFoundException(`No user found for login: ${loginDto.login}`);
    }

    const isPasswordValid = await this.hash.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      userId: user.id,
      login: user.login,
    };

    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.TOKEN_EXPIRE_TIME;

    const accessToken = await this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });

    return { accessToken };
  }
}
