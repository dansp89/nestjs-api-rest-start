// @file: src/api/stock/stock.module.ts

import { Module } from '@nestjs/common';
import { StockController } from '@/src/api/stock/stock.controller';
import { StockService } from '@/src/api/stock/stock.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
