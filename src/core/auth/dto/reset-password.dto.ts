// @file: src/auth/dto/reset-password.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'The new password for the user' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
