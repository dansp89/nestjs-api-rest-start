// @file: src/files/files.module.ts

import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaModule } from '@/src/core/prisma/prisma.module';
import { CasbinModule } from '@/src/core/casbin/casbin.module';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from '@/src/core/auth/auth.module';
import { join } from 'path';
import { env } from '@/config/env';

@Module({
  imports: [
    AuthModule,
    CasbinModule,
    PrismaModule,
    MulterModule.register({
      dest: join(__dirname, '..', env('DIR_UPLOADS', 'uploads')),
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
