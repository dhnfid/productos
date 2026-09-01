import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Marca } from './entity/marca.entity';
import { CreateMarcaDto } from './DTO/create-marca.dto';
import { UpdateMarcaDto } from './DTO/update-marca.dto';

@Injectable()
export class MarcaService {
  constructor(
    @InjectRepository(Marca)
    private readonly marcaRepository: Repository<Marca>,
  ) {}

  // GET ALL
  async findAll(): Promise<Marca[]> {
    return await this.marcaRepository.find();
  }

  // GET BY ID
  async findOne(id: string): Promise<Marca> {
    const marca = await this.marcaRepository.findOne({ where: { id } });
    if (!marca) {
      throw new NotFoundException(`Marca con id ${id} no encontrada`);
    }
    return marca;
  }

  // POST (CREATE)
  async create(createMarcaDto: CreateMarcaDto): Promise<Marca> {
    const nuevaMarca = this.marcaRepository.create(createMarcaDto);
    return await this.marcaRepository.save(nuevaMarca);
  }

  // PUT (UPDATE)
  async update(id: string, updateMarcaDto: UpdateMarcaDto): Promise<Marca> {
    const marca = await this.findOne(id);
    this.marcaRepository.merge(marca, updateMarcaDto);
    return await this.marcaRepository.save(marca);
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const marca = await this.findOne(id);
    await this.marcaRepository.remove(marca);
    return { message: `Marca con id ${id} eliminada correctamente` };
  }
}