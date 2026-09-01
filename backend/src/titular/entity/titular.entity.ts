import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Localidad } from "src/localidad/entity/localidad.entity";
import { Provincia } from "src/provincia/entity/provincia.entity";
import { Turno } from "src/turno/entity/turno.entity";
import { Vehiculo } from "src/vehiculo/entity/vehiculo.entity";

@Entity("Titular")
export class Titular{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

     @Column()
    'telefono' : number

     @Column()
    'numDocumento' : number


    @ManyToOne(() => Localidad, (localidad) => localidad.titulares)

    @JoinColumn({ name: 'localidad_id' }) 
    'localidad': Localidad;



    @ManyToOne(() => Provincia, (provincia) => provincia.titulares)

    @JoinColumn({ name: 'provincia_id' }) 
    'provincia': Provincia;

    @OneToMany(() => Turno, (turno) => turno.titular)
    'turnos': Turno[];

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.titular)
    'vehiculos': Vehiculo[];
}