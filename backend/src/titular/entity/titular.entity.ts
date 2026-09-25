import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Localidad } from "src/localidad/entity/localidad.entity";
import { Vehiculo } from "src/vehiculo/entity/vehiculo.entity";

@Entity("Titular")
export class Titular{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

     @Column()
    'telefono' : string

    @ManyToOne(() => Localidad, (localidad) => localidad.titulares)
    @JoinColumn({ name: 'localidad_id' }) 
    'localidad': Localidad;

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.titular)
    'vehiculos': Vehiculo[];
}