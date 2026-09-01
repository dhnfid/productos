import { Repository } from 'typeorm';
import { Turno } from './entity/turno.entity';
import { CreateTurnoDto } from './DTO/create-turno.dto';
import { UpdateTurnoDto } from './DTO/update-turno.dto';
export declare class TurnoService {
    private readonly turnoRepository;
    constructor(turnoRepository: Repository<Turno>);
    findAll(): Promise<Turno[]>;
    findOne(id: string): Promise<Turno>;
    create(createTurnoDto: CreateTurnoDto): Promise<Turno>;
    update(id: string, updateTurnoDto: UpdateTurnoDto): Promise<Turno>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
