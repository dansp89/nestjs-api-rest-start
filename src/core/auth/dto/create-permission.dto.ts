// @file: src/roles-permissions/dto/create-permission.dto.ts

import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description?: string;
}
