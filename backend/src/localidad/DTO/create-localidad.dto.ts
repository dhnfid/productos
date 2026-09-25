import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateLocalidadDto {
  @IsString()
  @IsNotEmpty()
  'nombre': string;

  @IsUUID()
  @IsNotEmpty()
  'provinciaId': string;
}