import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Vehiculo } from "src/vehiculo/entity/vehiculo.entity"
import { Marca } from "src/marca/entity/marca.entity"

@Entity("Modelo")
export class Modelo{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column()
    'nombre' : string

    @ManyToOne(() => Marca, (marca) => marca.modelos)
    @JoinColumn({ name: 'marca_id' }) 
    'marca': Marca;

    @OneToMany(() => Vehiculo, (vehiculo) => vehiculo.modelo)
    'vehiculos': Vehiculo[];
}