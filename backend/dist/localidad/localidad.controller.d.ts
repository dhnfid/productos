import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './DTO/create-localidad.dto';
import { UpdateLocalidadDto } from './DTO/update-localidad.dto';
import { Localidad } from './entity/localidad.entity';
export declare class LocalidadController {
    private readonly localidadService;
    constructor(localidadService: LocalidadService);
    findAll(): Promise<Localidad[]>;
    findOne(id: string): Promise<Localidad>;
    create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad>;
    update(id: string, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
