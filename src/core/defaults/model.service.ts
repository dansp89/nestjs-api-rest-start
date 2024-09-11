// @file: src/core/defaults/model.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
//@ts-ignore
import { ModelType } from '@/src/types/prisma';

@Injectable()
export class ModelService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createModelDto: Omit<ModelType, 'id'>): Promise<ModelType> {
    //@ts-ignore
    return this.prisma.model.create({ data: createModelDto });
  }

  async findAll(): Promise<ModelType[]> {
    //@ts-ignore
    return this.prisma.model.findMany();
  }

  async findOne(id: string): Promise<ModelType> {
    //@ts-ignore
    const model = await this.prisma.model.findUnique({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  async update(
    id: string,
    updateModelDto: Partial<ModelType>,
  ): Promise<ModelType> {
    //@ts-ignore
    const model = await this.prisma.model.update({
      where: { id },
      data: updateModelDto,
    });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
    return model;
  }

  async remove(id: string): Promise<void> {
    //@ts-ignore
    const model = await this.prisma.model.delete({ where: { id } });
    if (!model) {
      throw new NotFoundException(`Model with ID ${id} not found`);
    }
  }
}
