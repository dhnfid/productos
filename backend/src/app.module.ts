import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitularModule } from './titular/titular.module';
import { LocalidadModule } from './localidad/localidad.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { TurnoModule } from './turno/turno.module';
import { MarcaModule } from './marca/marca.module';
import { ModeloModule } from './modelo/modelo.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'products',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProductsModule, LocalidadModule, ProvinciaModule, TitularModule, TurnoModule, MarcaModule, ModeloModule, VehiculoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
