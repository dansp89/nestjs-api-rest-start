// @file: src/api/stock/stock.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { StockType } from '@/src/types/prisma';

@Injectable()
export class StockService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStockDto: Omit<StockType, 'id'>): Promise<StockType> {
        return this.prisma.stock.create({ data: createStockDto });
  }

  async findAll(): Promise<StockType[]> {
        return this.prisma.stock.findMany();
  }

  async findOne(id: string): Promise<StockType> {
        const stock = await this.prisma.stock.findUnique({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  async update(
    id: string,
    updateStockDto: Partial<StockType>,
  ): Promise<StockType> {
        const stock = await this.prisma.stock.update({
      where: { id },
      data: updateStockDto,
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  async remove(id: string): Promise<void> {
        const stock = await this.prisma.stock.delete({ where: { id } });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
  }
}
