import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateModeloDto {
  @IsString()
  @IsNotEmpty()
  'nombre': string;

  @IsUUID()
  @IsNotEmpty()
  'marcaId': string;

}