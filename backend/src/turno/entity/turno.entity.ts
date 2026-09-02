import { Vehiculo } from "src/vehiculo/entity/vehiculo.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Titular } from "src/titular/entity/titular.entity";
import { Transform } from 'class-transformer';
import dayjs = require('dayjs');
import utc = require('dayjs/plugin/utc');
import timezone = require('dayjs/plugin/timezone');
dayjs.extend(utc);
dayjs.extend(timezone);


@Entity("Turno")
export class Turno{
    @PrimaryGeneratedColumn("uuid")
    'id' : string

    @Column({ type: 'timestamp with time zone' })
    @Transform(({ value }) => dayjs(value).tz('America/Argentina/Buenos_Aires').format())
    'fecha': Date;

    @Column()
    'km' : number

    @ManyToOne(() => Vehiculo, (vehiculo) => vehiculo.turno)
    @JoinColumn({ name: 'vehiculo_id' }) 
    'vehiculos': Vehiculo;

    @ManyToOne(() => Titular, (titular) => titular.turnos)
    @JoinColumn({ name: 'titular_id' }) 
    'titular': Titular;

    @Column()
    'descripcion' : string

    @Column()
    'precio' : number
}