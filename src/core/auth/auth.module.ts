// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from '@/src/core/auth/auth.service';
import { AuthController } from '@/src/core/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/src/core/auth/jwt.strategy';
import { PrismaModule } from '@/src/core/prisma/prisma.module';
import { MailModule } from '@/src/core/mail/mail.module';
import { RolesGuard } from '@/src/core/auth/roles.guard';
import { RolesService } from './roles.service';
import { RolesController } from '@/src/core/auth/roles.controller';
import { UserService } from '@/src/core/user/user.service';
import { env } from '@/config/env';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env(
        'JWT_SECRET',
        'eedfd7ef5303e85aa73a7c74de99bc0a8116fc339f909195d0eeb98b10cda1d9',
      ),
      signOptions: { expiresIn: env('JWT_EXPIRE', '1h') },
    }),
    PrismaModule,
    MailModule,
  ],
  providers: [AuthService, JwtStrategy, RolesGuard, RolesService, UserService],
  controllers: [AuthController, RolesController],
  exports: [AuthService, RolesGuard, JwtModule], // Certifique-se de exportar o JwtModule aqui
})
export class AuthModule {}
