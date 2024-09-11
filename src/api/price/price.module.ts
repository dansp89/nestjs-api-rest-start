// @file: src/api/price/price.module.ts

import { Module } from '@nestjs/common';
import { PriceController } from '@/src/api/price/price.controller';
import { PriceService } from '@/src/api/price/price.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
