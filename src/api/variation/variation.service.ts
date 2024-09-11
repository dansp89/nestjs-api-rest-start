// @file: src/api/variation/variation.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { VariationType } from '@/src/types/prisma';

@Injectable()
export class VariationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVariationDto: Omit<VariationType, 'id'>): Promise<VariationType> {
        return this.prisma.variation.create({ data: createVariationDto });
  }

  async findAll(): Promise<VariationType[]> {
        return this.prisma.variation.findMany();
  }

  async findOne(id: string): Promise<VariationType> {
        const variation = await this.prisma.variation.findUnique({ where: { id } });
    if (!variation) {
      throw new NotFoundException(`Variation with ID ${id} not found`);
    }
    return variation;
  }

  async update(
    id: string,
    updateVariationDto: Partial<VariationType>,
  ): Promise<VariationType> {
        const variation = await this.prisma.variation.update({
      where: { id },
      data: updateVariationDto,
    });
    if (!variation) {
      throw new NotFoundException(`Variation with ID ${id} not found`);
    }
    return variation;
  }

  async remove(id: string): Promise<void> {
        const variation = await this.prisma.variation.delete({ where: { id } });
    if (!variation) {
      throw new NotFoundException(`Variation with ID ${id} not found`);
    }
  }
}
