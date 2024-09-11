// @file: src/mail/mail.module.ts

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from '@/src/core/mail/mail.service';
import * as dotenv from 'dotenv';
import { env } from '@/config/env';

dotenv.config(); // Carrega as variáveis de ambiente

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: env('SMTP_HOST'),
        port: parseInt(env('SMTP_PORT'), 10),
        secure: env('SMTP_SECURE') === 'true',
        auth: {
          user: env('SMTP_USER'),
          pass: env('SMTP_PASS'),
        },
      },
      defaults: {
        from: env('EMAIL_FROM'),
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
