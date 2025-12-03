import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './interfaces/user.interface';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'Creates a new user',
  })
  @ApiResponse({ status: 201, description: 'The user has been created.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<Partial<User>> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Gets all users',
  })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get single user by id',
    description: 'Get single user by id',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Successful operation' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update user information',
    description: 'Update library user information by UUID',
  })
  @ApiResponse({ status: 200, description: 'The user has been updated.' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 403,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found.',
  })
  async update(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user',
  })
  @ApiResponse({ status: 204, description: 'Deleted successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request. userId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'User was not found.',
  })
  @HttpCode(204)
  async remove(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ): Promise<void> {
    this.userService.remove(id);
  }
}
