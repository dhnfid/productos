import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './DTO/create-vehiculo.dto';
import { UpdateVehiculoDto } from './DTO/update-vehiculo.dto';
import { Vehiculo } from './entity/vehiculo.entity';
export declare class VehiculoController {
    private readonly vehiculoService;
    constructor(vehiculoService: VehiculoService);
    findAll(): Promise<Vehiculo[]>;
    findOne(id: string): Promise<Vehiculo>;
    create(createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo>;
    update(id: string, updateVehiculoDto: UpdateVehiculoDto): Promise<Vehiculo>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
