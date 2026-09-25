import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EsquemaElectricoService } from './esquemaElectrico.service';
import { EsquemaElectrico } from './entity/esquemaElectrico.entity';
import { EsquemaElectricoController } from './esquemaElectrico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EsquemaElectrico])],
  controllers: [EsquemaElectricoController],
  providers: [EsquemaElectricoService],
  exports: [EsquemaElectricoService, TypeOrmModule],
})
export class EsquemaElectricoModule {}