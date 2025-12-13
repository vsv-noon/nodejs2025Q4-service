import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { AlbumsModule } from './albums/albums.module';
import { TracksModule } from './tracks/tracks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HashModule } from './hash/hash.module';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './logging/logging.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './logging/all-exceptions.filter';
import { RequestLoggerMiddleware } from './logging/request-logger.middleware';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HashModule,
    AuthModule,
    LoggingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
