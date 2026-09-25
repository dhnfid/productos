import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localidad } from './entity/localidad.entity';
import { CreateLocalidadDto } from './DTO/create-localidad.dto';
import { UpdateLocalidadDto } from './DTO/update-localidad.dto';

@Injectable()
export class LocalidadService {
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
  ) {}

  // GET ALL
  async findAll(): Promise<Localidad[]> {
    return await this.localidadRepository.find({relations: {provincia : true}});
  }

  // GET BY ID
  async findOne(id: string): Promise<Localidad> {
    const localidad = await this.localidadRepository.findOne({ where: { id }, relations: { provincia: true } });
    if (!localidad) {
      throw new NotFoundException(`Localidad con id ${id} no encontrada`);
    }
    return localidad;
  }

  // POST (CREATE)
  async create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
   const { provinciaId, ...datosLocalidad } = createLocalidadDto;

    const nuevaLocalidad = this.localidadRepository.create({
      ...datosLocalidad,
      provincia: { id: provinciaId } as any,
    });

    return await this.localidadRepository.save(nuevaLocalidad);
  }

  // PUT (UPDATE)
  async update(id: string, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad> {
    const localidad = await this.findOne(id);
    const { provinciaId, ...datosActualizar } = updateLocalidadDto;

    this.localidadRepository.merge(localidad, datosActualizar);

    if (provinciaId) localidad.provincia = { id: provinciaId } as any;

    return await this.localidadRepository.save(localidad);
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const localidad = await this.findOne(id);
    await this.localidadRepository.remove(localidad);
    return { message: `Localidad con id ${id} eliminada correctamente` };
  }
}