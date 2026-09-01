import { ProvinciaService } from './provincia.service';
import { CreateProvinciaDto } from './DTO/create-provincia.dto';
import { UpdateProvinciaDto } from './DTO/update-provincia.dto';
import { Provincia } from './entity/provincia.entity';
export declare class ProvinciaController {
    private readonly provinciaService;
    constructor(provinciaService: ProvinciaService);
    findAll(): Promise<Provincia[]>;
    findOne(id: string): Promise<Provincia>;
    create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia>;
    update(id: string, updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
