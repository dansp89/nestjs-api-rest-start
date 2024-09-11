// @file: src/core/casbin/casbin.module.ts

import { Module } from '@nestjs/common';
import { CasbinService } from '@/src/core/casbin/casbin.service';
import { CasbinGuard } from '@/src/core/casbin/casbin.guard';

@Module({
  providers: [CasbinService, CasbinGuard],
  exports: [CasbinService, CasbinGuard],
})
export class CasbinModule {}
