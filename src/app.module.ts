// @file: src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { CasbinModule } from '@/src/core/casbin/casbin.module';
import { PermissionsController } from '@/src/core/permissions/permissions.controller';

import { FilesModule } from '@/src/core/files/files.module';
import { UserModule } from '@/src/core/user/user.module';
import { AuthModule } from '@/src/core/auth/auth.module';
import { DynamicModuleLoader } from '@/src/core/dynamic-module-loader';

@Module({
  imports: [
    CasbinModule,
    AuthModule,
    UserModule,
    FilesModule,
    DynamicModuleLoader.forRoot(),
  ],
  controllers: [AppController, PermissionsController],
  providers: [AppService],
})
export class AppModule {}
