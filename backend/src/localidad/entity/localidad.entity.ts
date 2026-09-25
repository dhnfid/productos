import { Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Titular } from "src/titular/entity/titular.entity";
import { Provincia } from "src/provincia/entity/provincia.entity";

@Entity("Localidad")
export class Localidad{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

    @ManyToOne(() => Provincia, (provincia) => provincia.localidades)
    @JoinColumn({ name: 'provincia_id' }) 
    'provincia': Provincia;

    @OneToMany(() => Titular, (titular) => titular.localidad)
    'titulares': Titular[];
}