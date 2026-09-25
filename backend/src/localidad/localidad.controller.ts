import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './DTO/create-localidad.dto';
import { UpdateLocalidadDto } from './DTO/update-localidad.dto';
import { Localidad } from './entity/localidad.entity';
import { AuthGuard } from 'node_modules/@nestjs/passport/dist/auth.guard';

// @UseGuards(AuthGuard('jwt'))
@Controller('localidad')
export class LocalidadController {
  constructor(private readonly localidadService: LocalidadService) {}

  // GET /api/localidad
  @Get()
  findAll(): Promise<Localidad[]> {
    return this.localidadService.findAll();
  }

  // GET /api/localidad/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Localidad> {
    return this.localidadService.findOne(id);
  }

  // POST /api/localidad
  @Post()
  create(@Body() createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    return this.localidadService.create(createLocalidadDto);
  }

  // PUT /api/localidad/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLocalidadDto: UpdateLocalidadDto,
  ): Promise<Localidad> {
    return this.localidadService.update(id, updateLocalidadDto);
  }

  // DELETE /api/localidad/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.localidadService.remove(id);
  }
}