import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Turno } from './entity/turno.entity';
import { CreateTurnoDto } from './DTO/create-turno.dto';
import { UpdateTurnoDto } from './DTO/update-turno.dto';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  // GET ALL
  async findAll(): Promise<Turno[]> {
    return await this.turnoRepository.find({
      relations: {
        vehiculos: true,
        titular: true
      },
    });
  }

  // GET BY ID
  async findOne(id: string): Promise<Turno> {
    const turno = await this.turnoRepository.findOne({
      where: { id },
      relations: {
        vehiculos: true,
        titular: true
      },
    });

    if (!turno) {
      throw new NotFoundException(`Turno con id ${id} no encontrado`);
    }
    return turno;
  }

  // POST (CREATE)
  async create(createTurnoDto: CreateTurnoDto): Promise<Turno> {
    const { vehiculoId, titularId, ...datosTurno } = createTurnoDto;

    const nuevoTurno = this.turnoRepository.create({
      ...datosTurno,
      fecha: new Date(),
      vehiculos: { id: vehiculoId },
      titular: { id: titularId },
    });

    return await this.turnoRepository.save(nuevoTurno);
  }

  // PUT (UPDATE)
  async update(id: string, updateTurnoDto: UpdateTurnoDto): Promise<Turno> {
    const turno = await this.findOne(id);
    const { vehiculoId, titularId, ...datosActualizar } = updateTurnoDto;

    this.turnoRepository.merge(turno, datosActualizar);

    if (vehiculoId) turno.vehiculos = { id: vehiculoId } as any;
    if (titularId) turno.titular = { id: titularId } as any;

    return await this.turnoRepository.save(turno);
  }

  // DELETE
  async remove(id: string): Promise<{ message: string }> {
    const turno = await this.findOne(id);
    await this.turnoRepository.remove(turno);
    return { message: `Turno con id ${id} eliminado correctamente` };
  }
}