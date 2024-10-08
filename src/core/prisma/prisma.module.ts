// @file: src/prisma/prisma.module.ts

import { Module } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
