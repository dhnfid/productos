import { Repository } from 'typeorm';
import { Vehiculo } from './entity/vehiculo.entity';
import { CreateVehiculoDto } from './DTO/create-vehiculo.dto';
import { UpdateVehiculoDto } from './DTO/update-vehiculo.dto';
export declare class VehiculoService {
    private readonly vehiculoRepository;
    constructor(vehiculoRepository: Repository<Vehiculo>);
    findAll(): Promise<Vehiculo[]>;
    findOne(id: string): Promise<Vehiculo>;
    create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo>;
    update(id: string, updateVehiculoDto: UpdateVehiculoDto): Promise<Vehiculo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
