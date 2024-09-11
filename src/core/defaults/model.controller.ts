// @file: src/core/defaults/model.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModelService } from '@/src/core/defaults/model.service';
//@ts-ignore
import { ModelType } from '@/src/types/prisma';

@ApiTags('Model')
@Controller('model')
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post()
  @ApiOperation({ summary: 'Create a model' })
  @ApiResponse({
    status: 201,
    description: 'The model has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createModelDto: Omit<ModelType, 'id'>,
  ): Promise<ModelType> {
    //@ts-ignore
    return this.modelService.create(createModelDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all models' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all models.',
  })
  async findAll(): Promise<ModelType[]> {
    //@ts-ignore
    return this.modelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a model by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the model.',
  })
  @ApiResponse({ status: 404, description: 'Model not found.' })
  async findOne(@Param('id') id: string): Promise<ModelType> {
    //@ts-ignore
    return this.modelService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a model by ID' })
  @ApiResponse({
    status: 200,
    description: 'The model has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Model not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateModelDto: Partial<ModelType>,
  ): Promise<ModelType> {
    //@ts-ignore
    return this.modelService.update(id, updateModelDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a model by ID' })
  @ApiResponse({
    status: 200,
    description: 'The model has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Model not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    //@ts-ignore
    return this.modelService.remove(id);
  }
}
