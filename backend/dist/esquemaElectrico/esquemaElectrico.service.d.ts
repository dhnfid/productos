import { Repository } from 'typeorm';
import { CreateEsquemaElectricoDto } from './DTO/create-esquemaElectrico.dto';
import { UpdateEsquemaElectricoDto } from './DTO/update-esquemaElectrico.dto';
import { EsquemaElectrico } from './entity/esquemaElectrico.entity';
export declare class EsquemaElectricoService {
    private readonly esquemaElectricoRepository;
    constructor(esquemaElectricoRepository: Repository<EsquemaElectrico>);
    findAll(): Promise<EsquemaElectrico[]>;
    findOne(id: string): Promise<EsquemaElectrico>;
    create(createEsquemaElectricoDto: CreateEsquemaElectricoDto, files?: any[]): Promise<EsquemaElectrico>;
    update(id: string, updateEsquemaElectricoDto: UpdateEsquemaElectricoDto, files?: any[]): Promise<EsquemaElectrico>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
