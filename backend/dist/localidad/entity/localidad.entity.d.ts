import { Titular } from "../../titular/entity/titular.entity";
import { Provincia } from "../../provincia/entity/provincia.entity";
export declare class Localidad {
    'id': string;
    'nombre': string;
    'provincia': Provincia;
    'titulares': Titular[];
}
