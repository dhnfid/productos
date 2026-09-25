import { PartialType } from '@nestjs/mapped-types';
import { CreateEsquemaElectricoDto } from './create-esquemaElectrico.dto';

export class UpdateEsquemaElectricoDto extends PartialType(CreateEsquemaElectricoDto) {}