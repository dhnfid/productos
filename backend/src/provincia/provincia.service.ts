import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provincia } from './entity/provincia.entity';
import { CreateProvinciaDto } from './DTO/create-provincia.dto';
import { UpdateProvinciaDto } from './DTO/update-provincia.dto';

@Injectable()
export class ProvinciaService {
  constructor(
    @InjectRepository(Provincia)
    private readonly provinciaRepository: Repository<Provincia>,
  ) {}

  // GET ALL
  async findAll(): Promise<Provincia[]> {
    return await this.provinciaRepository.find();
  }

  // GET BY ID
  async findOne(id: string): Promise<Provincia> {
    const provincia = await this.provinciaRepository.findOne({ where: { id } });
    if (!provincia) {
      throw new NotFoundException(`Provincia con id ${id} no encontrada`);
    }
    return provincia;
  }

  // POST (CREATE)
  async create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
    const nuevaProvincia = this.provinciaRepository.create(createProvinciaDto);
    return await this.provinciaRepository.save(nuevaProvincia);
  }

  // PUT (UPDATE)
  async update(id: string, updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia> {
    const provincia = await this.findOne(id);
    this.provinciaRepository.merge(provincia, updateProvinciaDto);
    return await this.provinciaRepository.save(provincia);
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const provincia = await this.findOne(id);
    await this.provinciaRepository.remove(provincia);
    return { message: `Provincia con id ${id} eliminada correctamente` };
  }
}