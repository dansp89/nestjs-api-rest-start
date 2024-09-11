// @file: src/api/franchiseCenter/franchiseCenter.module.ts

import { Module } from '@nestjs/common';
import { FranchiseCenterController } from '@/src/api/franchiseCenter/franchiseCenter.controller';
import { FranchiseCenterService } from '@/src/api/franchiseCenter/franchiseCenter.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FranchiseCenterController],
  providers: [FranchiseCenterService],
})
export class FranchiseCenterModule {}
