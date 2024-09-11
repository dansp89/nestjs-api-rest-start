// @file: src/api/franchiseCenter/franchiseCenter.controller.ts

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
import { FranchiseCenterService } from '@/src/api/franchiseCenter/franchiseCenter.service';
import { FranchiseCenterType } from '@/src/types/prisma';

@ApiTags('FranchiseCenter')
@Controller('franchiseCenter')
export class FranchiseCenterController {
  constructor(private readonly franchiseCenterService: FranchiseCenterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a franchiseCenter' })
  @ApiResponse({
    status: 201,
    description: 'The franchiseCenter has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createFranchiseCenterDto: Omit<FranchiseCenterType, 'id'>,
  ): Promise<FranchiseCenterType> {
        return this.franchiseCenterService.create(createFranchiseCenterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all franchiseCenters' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all franchiseCenters.',
  })
  async findAll(): Promise<FranchiseCenterType[]> {
        return this.franchiseCenterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a franchiseCenter by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the franchiseCenter.',
  })
  @ApiResponse({ status: 404, description: 'FranchiseCenter not found.' })
  async findOne(@Param('id') id: string): Promise<FranchiseCenterType> {
        return this.franchiseCenterService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a franchiseCenter by ID' })
  @ApiResponse({
    status: 200,
    description: 'The franchiseCenter has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'FranchiseCenter not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateFranchiseCenterDto: Partial<FranchiseCenterType>,
  ): Promise<FranchiseCenterType> {
        return this.franchiseCenterService.update(id, updateFranchiseCenterDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a franchiseCenter by ID' })
  @ApiResponse({
    status: 200,
    description: 'The franchiseCenter has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'FranchiseCenter not found.' })
  async remove(@Param('id') id: string): Promise<void> {
        return this.franchiseCenterService.remove(id);
  }
}
