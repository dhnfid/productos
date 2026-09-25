import { EsquemaElectricoService } from "./esquemaElectrico.service";
import { EsquemaElectrico } from "./entity/esquemaElectrico.entity";
import { UpdateEsquemaElectricoDto } from "./DTO/update-esquemaElectrico.dto";
import { CreateEsquemaElectricoDto } from "./DTO/create-esquemaElectrico.dto";
export declare class EsquemaElectricoController {
    private readonly esquemaElectricoService;
    constructor(esquemaElectricoService: EsquemaElectricoService);
    findAll(): Promise<EsquemaElectrico[]>;
    findOne(id: string): Promise<EsquemaElectrico>;
    create(createEsquemaElectricoDto: CreateEsquemaElectricoDto, files?: any[]): Promise<EsquemaElectrico>;
    update(id: string, updateEsquemaElectricoDto: UpdateEsquemaElectricoDto, files?: any[]): Promise<EsquemaElectrico>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
