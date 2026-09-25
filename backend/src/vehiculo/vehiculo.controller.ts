import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { CreateVehiculoDto } from './DTO/create-vehiculo.dto';
import { UpdateVehiculoDto } from './DTO/update-vehiculo.dto';
import { Vehiculo } from './entity/vehiculo.entity';
import { AuthGuard } from 'node_modules/@nestjs/passport/dist/auth.guard';


// @UseGuards(AuthGuard('jwt'))
@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  // GET /api/vehiculo
  @Get()
  findAll(): Promise<Vehiculo[]> {
    return this.vehiculoService.findAll();
  }

  // GET /api/vehiculo/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Vehiculo> {
    return this.vehiculoService.findOne(id);
  }

  // POST /api/vehiculo
  @Post()
  create(@Body() createVehiculoDto: CreateVehiculoDto): Promise<Vehiculo> {
    return this.vehiculoService.create(createVehiculoDto);
  }

  // PUT /api/vehiculo/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVehiculoDto: UpdateVehiculoDto,
  ): Promise<Vehiculo> {
    return this.vehiculoService.update(id, updateVehiculoDto);
  }

  // DELETE /api/vehiculo/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.vehiculoService.remove(id);
  }
}