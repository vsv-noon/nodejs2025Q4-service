import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() loginDto: LoginDto) {
    return await this.authService.signUp(loginDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async login(@Body() loginDto: LoginDto) {
    const tokens = await this.authService.login(loginDto);
    if (!tokens) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return tokens;
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() dto: RefreshDto) {
    if (!dto.refreshToken) {
      throw new UnauthorizedException('Refresh token is required');
    }
    const tokens = await this.authService.refreshToken(dto.refreshToken);
    if (!tokens) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return tokens;
  }
}
