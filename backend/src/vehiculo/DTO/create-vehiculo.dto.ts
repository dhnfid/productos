import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateVehiculoDto {
  @IsString()
  @IsNotEmpty()
  'patente': string;

  @IsUUID()
  @IsNotEmpty()
  'modeloId': string;

  @IsUUID()
  @IsNotEmpty()
  'titularId': string;
}