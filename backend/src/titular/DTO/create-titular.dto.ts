import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTitularDto {
  @IsString()
  @IsNotEmpty()
  'nombre': string;

  @IsNumber()
  'telefono': string;


  @IsUUID()
  @IsNotEmpty()
  'localidadId': string;
}