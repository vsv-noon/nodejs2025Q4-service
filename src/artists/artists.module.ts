import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  imports: [forwardRef(() => AlbumsModule)],
  controllers: [ArtistsController],
  providers: [ArtistsService],
})
export class ArtistsModule {}
