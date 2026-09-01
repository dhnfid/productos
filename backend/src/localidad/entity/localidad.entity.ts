import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Titular } from "src/titular/entity/titular.entity";

@Entity("Localidad")
export class Localidad{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

    @OneToMany(() => Titular, (titular) => titular.localidad)
    'titulares': Titular[];
}