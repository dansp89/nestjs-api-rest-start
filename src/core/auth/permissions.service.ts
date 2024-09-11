// @file: src/core/auth/permissions.service.ts

import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionsService {
  private permissions: Permission[] = []; // Simulando um banco de dados

  async createPermission(
    createPermissionDto: CreatePermissionDto,
  ): Promise<Permission> {
    const newPermission: Permission = {
      id: this.permissions.length + 1, // Simulando ID auto-incremental
      ...createPermissionDto,
    };
    this.permissions.push(newPermission);
    return newPermission;
  }

  async removePermission(id: number): Promise<void> {
    this.permissions = this.permissions.filter(
      (permission) => permission.id !== id,
    );
  }

  async findAll(): Promise<Permission[]> {
    return this.permissions;
  }
}
