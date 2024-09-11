// @file: src/core/auth/dto/create-role.dto.ts

import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description?: string;
}
