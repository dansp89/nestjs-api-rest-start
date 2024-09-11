// @file: src/user/user.module.ts

import { Module } from '@nestjs/common';
import { UserController } from '@/src/core/user/user.controller';
import { UserService } from '@/src/core/user/user.service';
import { PrismaModule } from '@/src/core/prisma/prisma.module';
import { CasbinModule } from '@/src/core/casbin/casbin.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule, CasbinModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [JwtModule],
})
export class UserModule {}
