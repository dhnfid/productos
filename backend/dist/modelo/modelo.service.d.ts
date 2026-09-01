import { Repository } from 'typeorm';
import { Modelo } from './entity/modelo.entity';
import { CreateModeloDto } from './DTO/create-modelo.dto';
import { UpdateModeloDto } from './DTO/update-modelo.dto';
export declare class ModeloService {
    private readonly modeloRepository;
    constructor(modeloRepository: Repository<Modelo>);
    findAll(): Promise<Modelo[]>;
    findOne(id: string): Promise<Modelo>;
    create(createModeloDto: CreateModeloDto): Promise<Modelo>;
    update(id: string, updateModeloDto: UpdateModeloDto): Promise<Modelo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
