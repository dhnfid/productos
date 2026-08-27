import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './entity/products.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(): Promise<Products[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Products | null> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() product: Products): Promise<Products> {
    return this.productsService.create(product);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() product: Products,
  ): Promise<Products | null> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productsService.delete(id);
  }
}
