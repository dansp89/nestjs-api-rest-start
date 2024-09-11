// @file: src/api/price/price.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { PriceType } from '@/src/types/prisma';

@Injectable()
export class PriceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPriceDto: Omit<PriceType, 'id'>): Promise<PriceType> {
        return this.prisma.price.create({ data: createPriceDto });
  }

  async findAll(): Promise<PriceType[]> {
        return this.prisma.price.findMany();
  }

  async findOne(id: string): Promise<PriceType> {
        const price = await this.prisma.price.findUnique({ where: { id } });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return price;
  }

  async update(
    id: string,
    updatePriceDto: Partial<PriceType>,
  ): Promise<PriceType> {
        const price = await this.prisma.price.update({
      where: { id },
      data: updatePriceDto,
    });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return price;
  }

  async remove(id: string): Promise<void> {
        const price = await this.prisma.price.delete({ where: { id } });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
  }
}
