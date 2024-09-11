// @file: src/api/product/product.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { ProductType } from '@/src/types/prisma';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: Omit<ProductType, 'id'>): Promise<ProductType> {
        return this.prisma.product.create({ data: createProductDto });
  }

  async findAll(): Promise<ProductType[]> {
        return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<ProductType> {
        const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(
    id: string,
    updateProductDto: Partial<ProductType>,
  ): Promise<ProductType> {
        const product = await this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async remove(id: string): Promise<void> {
        const product = await this.prisma.product.delete({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
