// @file: src/files/files.controller.ts

import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FilesService } from './files.service';
import { CreateFileDto, UpdateFileDto } from './dto/create-file.dto';
import { JwtAuthGuard } from '@/src/core/auth/jwt-auth.guard';
import { CasbinGuard } from '@/src/core/casbin/casbin.guard';

import { FileUploadDto } from './dto/file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('files')
@ApiTags('Files')
@UseGuards(JwtAuthGuard, CasbinGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    type: FileUploadDto, // Define o DTO para a documentação
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  async uploadFile(@UploadedFile() file: Multer.File) {
    return this.filesService.uploadFile(file);
  }

  // @Post()
  // @ApiOperation({ summary: 'Create a file' })
  // @ApiResponse({ status: 201, description: 'The file has been successfully created.' })
  // create(@Body() createFileDto: CreateFileDto) {
  //   return this.filesService.create(createFileDto);
  // }

  @Get()
  @ApiOperation({
    summary: 'Get a list of files with pagination, filters, and sorting',
  })
  @ApiResponse({
    status: 200,
    description: 'List of files retrieved successfully.',
  })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortBy') sortBy = 'createdAt',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
    @Query('nameFilter') nameFilter = '',
    @Query('dateRangeStart') dateRangeStart?: Date,
    @Query('dateRangeEnd') dateRangeEnd?: Date,
  ) {
    return this.filesService.findAll({
      page: +page,
      limit: +limit,
      sortBy,
      sortOrder,
      nameFilter,
      dateRangeStart: dateRangeStart ? new Date(dateRangeStart) : undefined,
      dateRangeEnd: dateRangeEnd ? new Date(dateRangeEnd) : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a file by ID' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a file by ID' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file by ID' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  remove(@Param('id') id: string) {
    return this.filesService.delete(id);
  }
}
