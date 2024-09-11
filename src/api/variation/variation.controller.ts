// @file: src/api/variation/variation.controller.ts

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
import { VariationService } from '@/src/api/variation/variation.service';
import { VariationType } from '@/src/types/prisma';

@ApiTags('Variation')
@Controller('variation')
export class VariationController {
  constructor(private readonly variationService: VariationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a variation' })
  @ApiResponse({
    status: 201,
    description: 'The variation has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createVariationDto: Omit<VariationType, 'id'>,
  ): Promise<VariationType> {
        return this.variationService.create(createVariationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all variations' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all variations.',
  })
  async findAll(): Promise<VariationType[]> {
        return this.variationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a variation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the variation.',
  })
  @ApiResponse({ status: 404, description: 'Variation not found.' })
  async findOne(@Param('id') id: string): Promise<VariationType> {
        return this.variationService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a variation by ID' })
  @ApiResponse({
    status: 200,
    description: 'The variation has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Variation not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateVariationDto: Partial<VariationType>,
  ): Promise<VariationType> {
        return this.variationService.update(id, updateVariationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a variation by ID' })
  @ApiResponse({
    status: 200,
    description: 'The variation has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Variation not found.' })
  async remove(@Param('id') id: string): Promise<void> {
        return this.variationService.remove(id);
  }
}
