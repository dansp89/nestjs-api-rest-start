// @file: src/api/product/product.module.ts

import { Module } from '@nestjs/common';
import { ProductController } from '@/src/api/product/product.controller';
import { ProductService } from '@/src/api/product/product.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
