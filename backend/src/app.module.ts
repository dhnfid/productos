import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitularModule } from './titular/titular.module';
import { LocalidadModule } from './localidad/localidad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { TurnoModule } from './turno/turno.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { AuthModule } from './auth/auth.module';
import { EsquemaElectricoModule } from './esquemaElectrico/esquemaElectrico.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mi_base_de_datos',
      autoLoadEntities: true,
      synchronize: true,
    }),
    LocalidadModule, ProvinciaModule, TitularModule, TurnoModule, MarcaModule, ModeloModule, VehiculoModule, AuthModule, EsquemaElectricoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
