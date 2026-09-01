import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Modelo } from "src/modelo/entity/modelo.entity";

@Entity("Marca")
export class Marca{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

    @OneToMany(() => Modelo, (modelo) => modelo.marca)
    'modelos': Modelo[];
}
