import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Titular } from "src/titular/entity/titular.entity";

@Entity("Provincia")
export class Provincia{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

    @OneToMany(() => Titular, (titular) => titular.provincia)
    'titulares': Titular[];
}