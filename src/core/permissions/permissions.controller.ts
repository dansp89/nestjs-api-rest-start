// @file: src/core/permissions/permissions.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CasbinService } from '@/src/core/casbin/casbin.service';
import { JwtAuthGuard } from '@/src/core/auth/jwt-auth.guard';
import { CasbinGuard } from '@/src/core/casbin/casbin.guard';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly casbinService: CasbinService) {}

  @Post('add')
  @UseGuards(JwtAuthGuard)
  async addPolicy(
    @Body() body: { sub: string; obj: string; act: string },
  ): Promise<void> {
    const { sub, obj, act } = body;
    await this.casbinService.addPolicy(sub, obj, act);
  }

  @Get('can')
  @UseGuards(JwtAuthGuard, CasbinGuard)
  async can(
    @Query('userRole') userRole: string,
    @Query('resource') resource: string,
    @Query('action') action: string,
  ): Promise<boolean> {
    return await this.casbinService.can(userRole, resource, action);
  }

  @Get('policies')
  @UseGuards(JwtAuthGuard)
  async getAllPolicies(): Promise<any[]> {
    return await this.casbinService.getAllPolicies();
  }
}
