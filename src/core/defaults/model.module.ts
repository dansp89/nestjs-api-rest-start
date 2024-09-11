// @file: src/core/defaults/model.module.ts

import { Module } from '@nestjs/common';
import { ModelController } from '@/src/core/defaults/model.controller';
import { ModelService } from '@/src/core/defaults/model.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ModelController],
  providers: [ModelService],
})
export class ModelModule {}
