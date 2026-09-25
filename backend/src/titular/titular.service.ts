import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Titular } from './entity/titular.entity';
import { CreateTitularDto } from './DTO/create-titular.dto';
import { UpdateTitularDto } from './DTO/update-titular.dto';

@Injectable()
export class TitularService {
  constructor(
    @InjectRepository(Titular)
    private readonly titularRepository: Repository<Titular>,
  ) {}

  // GET ALL (incluye las relaciones de Localidad y Provincia)
  async findAll(): Promise<Titular[]> {
    return await this.titularRepository.find({
      relations: {localidad: {provincia: true}},
    });
  }

async findOne(id: string): Promise<Titular> {
  const titular = await this.titularRepository.findOne({
    where: { id },
    relations: {
      localidad: { provincia: true },
    },
  });

  if (!titular) {
    throw new NotFoundException(`Titular con id ${id} no encontrado`);
  }
  return titular;
}

  // POST (CREATE)
  async create(createTitularDto: CreateTitularDto): Promise<Titular> {
    const { localidadId, ...datosTitular } = createTitularDto;

    const nuevoTitular = this.titularRepository.create({
      ...datosTitular,
      localidad: { id: localidadId },
    });

    return await this.titularRepository.save(nuevoTitular);
  }

  // PUT (UPDATE)
  async update(id: string, updateTitularDto: UpdateTitularDto): Promise<Titular> {
    const titular = await this.findOne(id);
    const { localidadId, ...datosActualizar } = updateTitularDto;

    this.titularRepository.merge(titular, datosActualizar);

    if (localidadId) titular.localidad = { id: localidadId } as any;

    return await this.titularRepository.save(titular);
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const titular = await this.findOne(id);
    await this.titularRepository.remove(titular);
    return { message: `Titular con id ${id} eliminado correctamente` };
  }
}