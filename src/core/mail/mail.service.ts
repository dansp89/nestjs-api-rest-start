// @file: src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer'; // Exemplo de biblioteca para envio de e-mail

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetLink = `/auth/reset-password/${resetToken}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      template: './password-reset', // Template do e-mail
      context: { resetLink },
    });
  }
}
