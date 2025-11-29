import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  artistId: string | null;

  @ApiProperty()
  @IsString()
  @IsOptional()
  albumId: string | null;

  @ApiProperty()
  @IsNumber()
  duration: number;
}
