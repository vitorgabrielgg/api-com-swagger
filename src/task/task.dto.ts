import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class TaskDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  title: string;
}
