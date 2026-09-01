import { Localidad } from "../../localidad/entity/localidad.entity";
import { Provincia } from "../../provincia/entity/provincia.entity";
import { Turno } from "../../turno/entity/turno.entity";
import { Vehiculo } from "../../vehiculo/entity/vehiculo.entity";
export declare class Titular {
    'id': string;
    'nombre': string;
    'telefono': number;
    'numDocumento': number;
    'localidad': Localidad;
    'provincia': Provincia;
    'turnos': Turno[];
    'vehiculos': Vehiculo[];
}
