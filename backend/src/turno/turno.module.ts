import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turno } from './entity/turno.entity';
import { TurnoService } from './turno.service';
import { TurnoController } from './turno.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [TurnoController],
  providers: [TurnoService],
  exports: [TurnoService, TypeOrmModule],
})
export class TurnoModule {}