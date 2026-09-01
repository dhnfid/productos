import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { ModeloService } from './modelo.service';
import { CreateModeloDto } from './DTO/create-modelo.dto';
import { UpdateModeloDto } from './DTO/update-modelo.dto';
import { Modelo } from './entity/modelo.entity';

@Controller('modelo')
export class ModeloController {
  constructor(private readonly modeloService: ModeloService) {}

  // GET /api/modelo
  @Get()
  findAll(): Promise<Modelo[]> {
    return this.modeloService.findAll();
  }

  // GET /api/modelo/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Modelo> {
    return this.modeloService.findOne(id);
  }

  // POST /api/modelo
  @Post()
  create(@Body() createModeloDto: CreateModeloDto): Promise<Modelo> {
    return this.modeloService.create(createModeloDto);
  }

  // PUT /api/modelo/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateModeloDto: UpdateModeloDto,
  ): Promise<Modelo> {
    return this.modeloService.update(id, updateModeloDto);
  }

  // DELETE /api/modelo/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.modeloService.remove(id);
  }
}