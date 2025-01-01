import { Module } from '@nestjs/common';
import { PrismaRepositoryService } from './prisma-repository.service';

@Module({
  exports: [PrismaRepositoryService],
  providers: [PrismaRepositoryService],
})
export class PrismaRepositoryModule {}
