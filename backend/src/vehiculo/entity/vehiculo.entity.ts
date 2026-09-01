import { Turno } from "src/turno/entity/turno.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { OneToMany } from "typeorm";
import { ManyToOne, JoinColumn } from "typeorm";
import { Titular } from "src/titular/entity/titular.entity";
import { Modelo } from "src/modelo/entity/modelo.entity";

@Entity("Vehiculo")
export class Vehiculo{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'patente' : string

    @OneToMany(() => Turno, (turno) => turno.vehiculos)
    'turno': Turno[];

    @ManyToOne(() => Modelo, (modelo) => modelo.vehiculos)
    @JoinColumn({ name: 'modelo_id' }) 
    'modelo': Modelo;

    @ManyToOne(() => Titular, (titular) => titular.vehiculos)
    @JoinColumn({ name: 'titular_id' }) 
    'titular': Titular;
}