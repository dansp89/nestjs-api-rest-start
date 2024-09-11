// @file: src/core/auth/roles.service.ts

import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  private roles: Role[] = []; // Simulando um banco de dados

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const newRole: Role = {
      id: this.roles.length + 1, // Simulando ID auto-incremental
      ...createRoleDto,
    };
    this.roles.push(newRole);
    return newRole;
  }

  async removeRole(id: number): Promise<void> {
    this.roles = this.roles.filter((role) => role.id !== id);
  }

  async findAll(): Promise<Role[]> {
    return this.roles;
  }
}
