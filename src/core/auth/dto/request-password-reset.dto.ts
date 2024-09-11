// @file: src/auth/dto/request-password-reset.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty({
    description: 'The email address of the user requesting a password reset',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
