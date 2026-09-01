import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './DTO/create-marca.dto';
import { UpdateMarcaDto } from './DTO/update-marca.dto';
import { Marca } from './entity/marca.entity';
export declare class MarcaController {
    private readonly marcaService;
    constructor(marcaService: MarcaService);
    findAll(): Promise<Marca[]>;
    findOne(id: string): Promise<Marca>;
    create(createMarcaDto: CreateMarcaDto): Promise<Marca>;
    update(id: string, updateMarcaDto: UpdateMarcaDto): Promise<Marca>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
