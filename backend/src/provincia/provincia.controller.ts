import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { CreateProvinciaDto } from './DTO/create-provincia.dto';
import { UpdateProvinciaDto } from './DTO/update-provincia.dto';
import { Provincia } from './entity/provincia.entity';

@Controller('provincia')
export class ProvinciaController {
  constructor(private readonly provinciaService: ProvinciaService) {}

  // GET /api/provincia
  @Get()
  findAll(): Promise<Provincia[]> {
    return this.provinciaService.findAll();
  }

  // GET /api/provincia/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Provincia> {
    return this.provinciaService.findOne(id);
  }

  // POST /api/provincia
  @Post()
  create(@Body() createProvinciaDto: CreateProvinciaDto): Promise<Provincia> {
    return this.provinciaService.create(createProvinciaDto);
  }

  // PUT /api/provincia/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProvinciaDto: UpdateProvinciaDto,
  ): Promise<Provincia> {
    return this.provinciaService.update(id, updateProvinciaDto);
  }

  // DELETE /api/provincia/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.provinciaService.remove(id);
  }
}