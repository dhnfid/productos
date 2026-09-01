import { Repository } from 'typeorm';
import { Marca } from './entity/marca.entity';
import { CreateMarcaDto } from './DTO/create-marca.dto';
import { UpdateMarcaDto } from './DTO/update-marca.dto';
export declare class MarcaService {
    private readonly marcaRepository;
    constructor(marcaRepository: Repository<Marca>);
    findAll(): Promise<Marca[]>;
    findOne(id: string): Promise<Marca>;
    create(createMarcaDto: CreateMarcaDto): Promise<Marca>;
    update(id: string, updateMarcaDto: UpdateMarcaDto): Promise<Marca>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
