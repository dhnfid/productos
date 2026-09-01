import { Repository } from 'typeorm';
import { Localidad } from './entity/localidad.entity';
import { CreateLocalidadDto } from './DTO/create-localidad.dto';
import { UpdateLocalidadDto } from './DTO/update-localidad.dto';
export declare class LocalidadService {
    private readonly localidadRepository;
    constructor(localidadRepository: Repository<Localidad>);
    findAll(): Promise<Localidad[]>;
    findOne(id: string): Promise<Localidad>;
    create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad>;
    update(id: string, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
