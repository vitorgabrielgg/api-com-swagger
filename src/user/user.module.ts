import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaRepositoryService } from 'src/prisma-repository/prisma-repository.service';
import { PrismaRepositoryModule } from 'src/prisma-repository/prisma-repository.module';

@Module({
  controllers: [UserController],
  imports: [PrismaRepositoryModule],
  exports: [UserService],
  providers: [UserService, PrismaRepositoryService],
})
export class UserModule {}
