// @file: src/api/franchiseCenter/franchiseCenter.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { FranchiseCenterType } from '@/src/types/prisma';

@Injectable()
export class FranchiseCenterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFranchiseCenterDto: Omit<FranchiseCenterType, 'id'>): Promise<FranchiseCenterType> {
        return this.prisma.franchiseCenter.create({ data: createFranchiseCenterDto });
  }

  async findAll(): Promise<FranchiseCenterType[]> {
        return this.prisma.franchiseCenter.findMany();
  }

  async findOne(id: string): Promise<FranchiseCenterType> {
        const franchiseCenter = await this.prisma.franchiseCenter.findUnique({ where: { id } });
    if (!franchiseCenter) {
      throw new NotFoundException(`FranchiseCenter with ID ${id} not found`);
    }
    return franchiseCenter;
  }

  async update(
    id: string,
    updateFranchiseCenterDto: Partial<FranchiseCenterType>,
  ): Promise<FranchiseCenterType> {
        const franchiseCenter = await this.prisma.franchiseCenter.update({
      where: { id },
      data: updateFranchiseCenterDto,
    });
    if (!franchiseCenter) {
      throw new NotFoundException(`FranchiseCenter with ID ${id} not found`);
    }
    return franchiseCenter;
  }

  async remove(id: string): Promise<void> {
        const franchiseCenter = await this.prisma.franchiseCenter.delete({ where: { id } });
    if (!franchiseCenter) {
      throw new NotFoundException(`FranchiseCenter with ID ${id} not found`);
    }
  }
}
