import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEsquemaElectricoDto } from './DTO/create-esquemaElectrico.dto';
import { UpdateEsquemaElectricoDto } from './DTO/update-esquemaElectrico.dto';
import { EsquemaElectrico } from './entity/esquemaElectrico.entity';

@Injectable()
export class EsquemaElectricoService {
  constructor(
    @InjectRepository(EsquemaElectrico)
    private readonly esquemaElectricoRepository: Repository<EsquemaElectrico>,
  ) {}

  async findAll(): Promise<EsquemaElectrico[]> {
    return await this.esquemaElectricoRepository.find({
      relations: {
        modelo: { marca: true },
      },
    });
  }

  async findOne(id: string): Promise<EsquemaElectrico> {
    const esquemaElectrico = await this.esquemaElectricoRepository.findOne({
      where: { id },
      relations: {
        modelo: { marca: true },
      },
    });

    if (!esquemaElectrico) {
      throw new NotFoundException(`Esquema Eléctrico con id ${id} no encontrado`);
    }
    return esquemaElectrico;
  }

  async create(
    createEsquemaElectricoDto: CreateEsquemaElectricoDto, 
    files?: any[]
  ): Promise<EsquemaElectrico> {
    const { modeloId, ...datosEsquemaElectrico } = createEsquemaElectricoDto;

    // Convertimos los archivos recibidos en un array de rutas
    const nuevasRutas = files && files.length > 0 
      ? files.map(file => `uploads/esquemas/${file.filename}`)
      : [];

    const urlArchivo = [
      ...(datosEsquemaElectrico.urlArchivo || []),
      ...nuevasRutas
    ];

    const nuevoEsquemaElectrico = this.esquemaElectricoRepository.create({
      ...datosEsquemaElectrico,
      urlArchivo,
      modelo: { id: modeloId },
    });

    return await this.esquemaElectricoRepository.save(nuevoEsquemaElectrico);
  }

  async update(
    id: string, 
    updateEsquemaElectricoDto: UpdateEsquemaElectricoDto, 
    files?: any[]
  ): Promise<EsquemaElectrico> {
    const esquemaElectrico = await this.findOne(id);
    const { modeloId, ...datosActualizar } = updateEsquemaElectricoDto;

    let urlArchivo = esquemaElectrico.urlArchivo || [];

    if (files && files.length > 0) {
      const nuevasRutas = files.map(file => `uploads/esquemas/${file.filename}`);
      urlArchivo = [...urlArchivo, ...nuevasRutas];
    }

    this.esquemaElectricoRepository.merge(esquemaElectrico, {
      ...datosActualizar,
      urlArchivo,
    });

    if (modeloId) esquemaElectrico.modelo = { id: modeloId } as any;

    return await this.esquemaElectricoRepository.save(esquemaElectrico);
  }

  async remove(id: string): Promise<{ message: string }> {
    const esquemaElectrico = await this.findOne(id);
    await this.esquemaElectricoRepository.remove(esquemaElectrico);
    return { message: `Esquema Eléctrico con id ${id} eliminado correctamente` };
  }
}