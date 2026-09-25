import { Vehiculo } from "../../vehiculo/entity/vehiculo.entity";
import { Marca } from "../../marca/entity/marca.entity";
import { EsquemaElectrico } from "../../esquemaElectrico/entity/esquemaElectrico.entity";
export declare class Modelo {
    'id': string;
    'nombre': string;
    'marca': Marca;
    'vehiculos': Vehiculo[];
    'fallasHabituales'?: string;
    'esquemasElectricos': EsquemaElectrico[];
}
