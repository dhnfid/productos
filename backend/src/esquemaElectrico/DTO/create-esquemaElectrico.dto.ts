import { IsNotEmpty, IsString, IsUUID, IsOptional, IsArray } from 'class-validator';

export class CreateEsquemaElectricoDto {
  @IsString()
  @IsNotEmpty()
  'nombreArchivo': string;

  @IsOptional()
  @IsArray()
  'urlArchivo'?: string[];

  @IsString()
  'fallasHabituales'?: string;

  @IsUUID()
  @IsNotEmpty()
  'modeloId': string;
}