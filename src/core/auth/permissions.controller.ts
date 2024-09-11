// @file: src/core/auth/permissions.controller.ts

import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { PermissionsService } from '@/src/core/auth/permissions.service';
import { CreatePermissionDto } from '@/src/core/auth/dto/create-permission.dto';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  async createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Delete(':id')
  async removePermission(@Param('id') id: number) {
    return this.permissionsService.removePermission(id);
  }

  @Get()
  async findAll() {
    return this.permissionsService.findAll();
  }
}
