import { Injectable } from '@nestjs/common';
import { Products } from './entity/products.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>,
  ) {}

  async findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Products | null> {
    return this.productsRepository.findOne({ where: { id } });
  }

  async create(product: Products): Promise<Products> {
    return this.productsRepository.save(product);
  }

  async update(id: string, product: Products): Promise<Products | null> {
    await this.productsRepository.update(id, product);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
