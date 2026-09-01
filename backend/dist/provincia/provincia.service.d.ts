import { Repository } from 'typeorm';
import { Provincia } from './entity/provincia.entity';
import { CreateProvinciaDto } from './DTO/create-provincia.dto';
import { UpdateProvinciaDto } from './DTO/update-provincia.dto';
export declare class ProvinciaService {
    private readonly provinciaRepository;
    constructor(provinciaRepository: Repository<Provincia>);
    findAll(): Promise<Provincia[]>;
    findOne(id: string): Promise<Provincia>;
    create(createProvinciaDto: CreateProvinciaDto): Promise<Provincia>;
    update(id: string, updateProvinciaDto: UpdateProvinciaDto): Promise<Provincia>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
