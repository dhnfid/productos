import { Repository } from 'typeorm';
import { Titular } from './entity/titular.entity';
import { CreateTitularDto } from './DTO/create-titular.dto';
import { UpdateTitularDto } from './DTO/update-titular.dto';
export declare class TitularService {
    private readonly titularRepository;
    constructor(titularRepository: Repository<Titular>);
    findAll(): Promise<Titular[]>;
    findOne(id: string): Promise<Titular>;
    create(createTitularDto: CreateTitularDto): Promise<Titular>;
    update(id: string, updateTitularDto: UpdateTitularDto): Promise<Titular>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
