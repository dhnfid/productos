import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Modelo } from "src/modelo/entity/modelo.entity";

@Entity("esquemaElectrico")
export class EsquemaElectrico {
  @PrimaryGeneratedColumn("uuid")
  'id': string;

  // Cambiamos a simple-json para guardar un array de rutas de PDFs
  @Column('simple-json', { nullable: true })
  'urlArchivo': string[];

  @Column()
  'fallasHabituales'? : string


  @ManyToOne(() => Modelo, (modelo) => modelo.esquemasElectricos)
  @JoinColumn({ name: 'modelo_id' })
  'modelo': Modelo;
}