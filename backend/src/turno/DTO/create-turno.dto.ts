import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from 'class-validator';

export class CreateTurnoDto {

  @IsNotEmpty()
  @IsDateString()
  'fecha': string;

  @IsNumber()
  @IsPositive()
  'km': number;

  @IsNotEmpty()
  @IsString()
  'descripcion': string;

  @IsNumber()
  @IsPositive()
  'precio': number;

  @IsUUID()
  @IsNotEmpty()
  'vehiculoId': string;

}