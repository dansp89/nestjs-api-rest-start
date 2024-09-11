// @file: src/user/dto/update-user.dto.ts

import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '@/src/core/user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // Pode adicionar mais campos específicos para atualização, se necessário
}
