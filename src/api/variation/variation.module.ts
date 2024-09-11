// @file: src/api/variation/variation.module.ts

import { Module } from '@nestjs/common';
import { VariationController } from '@/src/api/variation/variation.controller';
import { VariationService } from '@/src/api/variation/variation.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [VariationController],
  providers: [VariationService],
})
export class VariationModule {}
