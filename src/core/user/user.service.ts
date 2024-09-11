// @file: src/user/user.service.ts

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import { CreateUserDto } from '@/src/core/user/dto/create-user.dto';
import { UpdateUserDto } from '@/src/core/user/dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      const errorMessages = errors
        .map((error) => Object.values(error.constraints))
        .flat();
      throw new BadRequestException(
        `Validation failed: ${errorMessages.join(', ')}`,
      );
    }
    const { role, ...userData } = createUserDto;
    const data: Prisma.UserCreateInput = {
      ...userData,
      role: role ?? undefined,
    };
    return this.prisma.user.create({ data });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
