import { ModeloService } from './modelo.service';
import { CreateModeloDto } from './DTO/create-modelo.dto';
import { UpdateModeloDto } from './DTO/update-modelo.dto';
import { Modelo } from './entity/modelo.entity';
export declare class ModeloController {
    private readonly modeloService;
    constructor(modeloService: ModeloService);
    findAll(): Promise<Modelo[]>;
    findOne(id: string): Promise<Modelo>;
    create(createModeloDto: CreateModeloDto): Promise<Modelo>;
    update(id: string, updateModeloDto: UpdateModeloDto): Promise<Modelo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
