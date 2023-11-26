import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // PrismaService belongs to this module
  exports: [PrismaService], // PrismaService is allowed to be used to any module to export this
})
export class PrismaModule {}
