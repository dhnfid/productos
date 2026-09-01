import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTitularDto {
  @IsString()
  @IsNotEmpty()
  'nombre': string;

  @IsNumber()
  'telefono': number;

  @IsNumber()
  'numDocumento': number;

  @IsUUID()
  @IsNotEmpty()
  'localidadId': string;

  @IsUUID()
  @IsNotEmpty()
  'provinciaId': string;
}