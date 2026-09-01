import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehiculo } from './entity/vehiculo.entity';
import { CreateVehiculoDto } from './DTO/create-vehiculo.dto';
import { UpdateVehiculoDto } from './DTO/update-vehiculo.dto';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectRepository(Vehiculo)
    private readonly vehiculoRepository: Repository<Vehiculo>,
  ) {}

  // GET ALL (trae las relaciones con Modelo y Titular)
  async findAll(): Promise<Vehiculo[]> {
    return await this.vehiculoRepository.find({
      relations: {modelo : true, titular : true},
    });
  }

  // GET BY ID (incluye Modelo, Titular y su historial de Turnos)
  async findOne(id: string): Promise<Vehiculo> {
    const vehiculo = await this.vehiculoRepository.findOne({
      where: { id },
      relations: {modelo : true, titular : true, turno : true},
    });

    if (!vehiculo) {
      throw new NotFoundException(`Vehículo con id ${id} no encontrado`);
    }
    return vehiculo;
  }

  // POST (CREATE)
async create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
  const { modeloId, titularId, ...datosVehiculo } = createVehiculoDto;

  const nuevoVehiculo = this.vehiculoRepository.create({
    ...datosVehiculo,
    modelo: { id: modeloId },
    titular: { id: titularId },
  });

  return await this.vehiculoRepository.save(nuevoVehiculo);
}

  // PUT (UPDATE)
async update(id: string, updateVehiculoDto: UpdateVehiculoDto): Promise<Vehiculo> {
  const vehiculo = await this.findOne(id);
  const { modeloId, titularId, ...datosActualizar } = updateVehiculoDto;

  this.vehiculoRepository.merge(vehiculo, datosActualizar);

  if (modeloId) vehiculo.modelo = { id: modeloId } as any;
  if (titularId) vehiculo.titular = { id: titularId } as any;

  return await this.vehiculoRepository.save(vehiculo);
}

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const vehiculo = await this.findOne(id);
    await this.vehiculoRepository.remove(vehiculo);
    return { message: `Vehículo con id ${id} eliminado correctamente` };
  }
}