import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Modelo } from './entity/modelo.entity';
import { CreateModeloDto } from './DTO/create-modelo.dto';
import { UpdateModeloDto } from './DTO/update-modelo.dto';

@Injectable()
export class ModeloService {
  constructor(
    @InjectRepository(Modelo)
    private readonly modeloRepository: Repository<Modelo>,
  ) {}

  // GET ALL
  async findAll(): Promise<Modelo[]> {
    return await this.modeloRepository.find({
      relations: {
        marca: true,
      },
    });
  }

  // GET BY ID
  async findOne(id: string): Promise<Modelo> {
    const modelo = await this.modeloRepository.findOne({
      where: { id },
      relations: {
        marca: true,
        vehiculos: true,
      },
    });

    if (!modelo) {
      throw new NotFoundException(`Modelo con id ${id} no encontrado`);
    }
    return modelo;
  }

  // POST (CREATE)
  async create(createModeloDto: CreateModeloDto): Promise<Modelo> {
    const { marcaId, ...datosModelo } = createModeloDto;

    const nuevoModelo = this.modeloRepository.create({
      ...datosModelo,
      marca: { id: marcaId },
    });

    return await this.modeloRepository.save(nuevoModelo);
  }

  // PUT (UPDATE)
  async update(id: string, updateModeloDto: UpdateModeloDto): Promise<Modelo> {
    const modelo = await this.findOne(id);
    const { marcaId, ...datosActualizar } = updateModeloDto;

    this.modeloRepository.merge(modelo, datosActualizar);

    if (marcaId) modelo.marca = { id: marcaId } as any;

    return await this.modeloRepository.save(modelo);
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const modelo = await this.findOne(id);
    await this.modeloRepository.remove(modelo);
    return { message: `Modelo con id ${id} eliminado correctamente` };
  }
}