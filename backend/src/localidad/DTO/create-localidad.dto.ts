import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLocalidadDto {
  @IsString()
  @IsNotEmpty()
  'nombre': string;
}