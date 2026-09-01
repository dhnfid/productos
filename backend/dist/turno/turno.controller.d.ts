import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './DTO/create-turno.dto';
import { UpdateTurnoDto } from './DTO/update-turno.dto';
import { Turno } from './entity/turno.entity';
export declare class TurnoController {
    private readonly turnoService;
    constructor(turnoService: TurnoService);
    findAll(): Promise<Turno[]>;
    findOne(id: string): Promise<Turno>;
    create(createTurnoDto: CreateTurnoDto): Promise<Turno>;
    update(id: string, updateTurnoDto: UpdateTurnoDto): Promise<Turno>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
