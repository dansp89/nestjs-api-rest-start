// @file: src/auth/auth.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/src/core/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { MailService } from '@/src/core/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(email: string, password: string) {
    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário no banco de dados
    const user = await this.prisma.user.create({
      data: { email, password: hashedPassword, role: 'user' },
    });

    // Gera o token JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Retorna o usuário e o token JWT
    return { user, access_token: accessToken };
  }

  async login(email: string, password: string) {
    // Busca o usuário no banco de dados
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Verifica se o usuário existe e a senha está correta
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Gera o token JWT
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload);

    // Retorna o usuário e o token JWT
    return { user, access_token: accessToken };
  }

  async requestPasswordReset(email: string) {
    // Busca o usuário no banco de dados
    const user = await this.prisma.user.findUnique({ where: { email } });

    // Verifica se o usuário existe
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Gera o token de redefinição
    const resetToken = randomBytes(32).toString('hex');

    // Atualiza o usuário com o token de redefinição e expiração
    await this.prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry: new Date(Date.now() + 3600000) }, // Token expira em 1 hora
    });

    // Envia o e-mail de redefinição de senha
    await this.mailService.sendPasswordResetEmail(email, resetToken);
  }

  async resetPassword(token: string, newPassword: string) {
    // Busca o usuário com o token de redefinição válido
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: { gte: new Date() },
      },
    });

    // Verifica se o token é válido
    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    // Criptografa a nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualiza o usuário com a nova senha e limpa o token de redefinição
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
  }
}
