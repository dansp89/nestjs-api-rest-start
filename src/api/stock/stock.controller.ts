// @file: src/api/stock/stock.controller.ts

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
import { StockService } from '@/src/api/stock/stock.service';
import { StockType } from '@/src/types/prisma';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @ApiOperation({ summary: 'Create a stock' })
  @ApiResponse({
    status: 201,
    description: 'The stock has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(
    @Body() createStockDto: Omit<StockType, 'id'>,
  ): Promise<StockType> {
        return this.stockService.create(createStockDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stocks' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all stocks.',
  })
  async findAll(): Promise<StockType[]> {
        return this.stockService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stock by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the stock.',
  })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  async findOne(@Param('id') id: string): Promise<StockType> {
        return this.stockService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a stock by ID' })
  @ApiResponse({
    status: 200,
    description: 'The stock has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: Partial<StockType>,
  ): Promise<StockType> {
        return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a stock by ID' })
  @ApiResponse({
    status: 200,
    description: 'The stock has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  async remove(@Param('id') id: string): Promise<void> {
        return this.stockService.remove(id);
  }
}
