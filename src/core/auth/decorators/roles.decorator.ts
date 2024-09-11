// @file: src/core/auth/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
import { Roles } from '@/src/core/auth/roles.enum';

export const ROLES_KEY = 'roles';
export const RolesDecorator = (...roles: Roles[]) =>
  SetMetadata(ROLES_KEY, roles);
