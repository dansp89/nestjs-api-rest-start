// @file: src/files/dto/file-upload.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({
    description: 'The file to upload',
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  file: any;
}
