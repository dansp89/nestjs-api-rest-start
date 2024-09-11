// @file: src/files/dto/create-file.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ example: 'file.txt', description: 'The name of the file' })
  readonly name: string;

  @ApiProperty({
    example: 'text/plain',
    description: 'The MIME type of the file',
  })
  readonly mimeType: string;

  @ApiProperty({
    example: 'http://example.com/file.txt',
    description: 'The URL of the file',
  })
  readonly url: string;
}

export class UpdateFileDto {
  @ApiProperty({ example: 'file.txt', description: 'The name of the file' })
  readonly name?: string;

  @ApiProperty({
    example: 'text/plain',
    description: 'The MIME type of the file',
  })
  readonly mimeType?: string;

  @ApiProperty({
    example: 'http://example.com/file.txt',
    description: 'The URL of the file',
  })
  readonly url?: string;
}
