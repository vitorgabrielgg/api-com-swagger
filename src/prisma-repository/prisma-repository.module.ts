import { Module } from '@nestjs/common';
import { PrismaRepositoryService } from './prisma-repository.service';

@Module({
  providers: [PrismaRepositoryService],
})
export class PrismaRepositoryModule {}
