import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localidad } from './entity/localidad.entity';
import { LocalidadService } from './localidad.service';
import { LocalidadController } from './localidad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Localidad])],
  controllers: [LocalidadController],
  providers: [LocalidadService],
  exports: [LocalidadService, TypeOrmModule],
})
export class LocalidadModule {}