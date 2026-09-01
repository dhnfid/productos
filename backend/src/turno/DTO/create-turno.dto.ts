import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CreateTurnoDto {
  @IsDateString()
  @IsNotEmpty()
  'fecha': string;

  @IsNumber()
  @IsPositive()
  'km': number;

  @IsUUID()
  @IsNotEmpty()
  'vehiculoId': string;

  @IsUUID()
  @IsNotEmpty()
  'titularId': string;

}