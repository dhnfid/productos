import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Vehiculo } from "src/vehiculo/entity/vehiculo.entity"
import { Marca } from "src/marca/entity/marca.entity"
import { EsquemaElectrico } from "src/esquemaElectrico/entity/esquemaElectrico.entity"

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

     @OneToMany(() => EsquemaElectrico, (esquemaElectrico) => esquemaElectrico.modelo)
    'esquemasElectricos': EsquemaElectrico[];
}