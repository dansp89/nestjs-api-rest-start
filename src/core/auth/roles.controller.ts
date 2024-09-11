// @file: src/core/auth/roles.controller.ts

import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { RolesService } from '@/src/core/auth/roles.service';
import { CreateRoleDto } from '@/src/core/auth/dto/create-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createRole(createRoleDto);
  }

  @Delete(':id')
  async removeRole(@Param('id') id: number) {
    return this.rolesService.removeRole(id);
  }

  @Get()
  async findAll() {
    return this.rolesService.findAll();
  }
}
