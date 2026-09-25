import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Titular } from "src/titular/entity/titular.entity";
import { Localidad } from "src/localidad/entity/localidad.entity";

@Entity("Provincia")
export class Provincia{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

    @OneToMany(() => Localidad, (localidad) => localidad.provincia)
    'localidades': Localidad[];
}