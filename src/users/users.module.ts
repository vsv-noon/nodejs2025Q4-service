import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HashModule } from 'src/hash/hash.module';

@Module({
  imports: [PrismaModule, HashModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
