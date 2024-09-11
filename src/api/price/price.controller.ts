// @file: src/api/price/price.controller.ts

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
import { PriceService } from '@/src/api/price/price.service';
import { PriceType } from '@/src/types/prisma';

@ApiTags('Price')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Post()
  @ApiOperation({ summary: 'Create a price' })
  @ApiResponse({
    status: 201,
    description: 'The price has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createPriceDto: Omit<PriceType, 'id'>,
  ): Promise<PriceType> {
        return this.priceService.create(createPriceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all prices' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all prices.',
  })
  async findAll(): Promise<PriceType[]> {
        return this.priceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a price by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the price.',
  })
  @ApiResponse({ status: 404, description: 'Price not found.' })
  async findOne(@Param('id') id: string): Promise<PriceType> {
        return this.priceService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a price by ID' })
  @ApiResponse({
    status: 200,
    description: 'The price has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Price not found.' })
  async update(
    @Param('id') id: string,
    @Body() updatePriceDto: Partial<PriceType>,
  ): Promise<PriceType> {
        return this.priceService.update(id, updatePriceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a price by ID' })
  @ApiResponse({
    status: 200,
    description: 'The price has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Price not found.' })
  async remove(@Param('id') id: string): Promise<void> {
        return this.priceService.remove(id);
  }
}
