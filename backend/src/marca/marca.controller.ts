import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { MarcaService } from './marca.service';
import { CreateMarcaDto } from './DTO/create-marca.dto';
import { UpdateMarcaDto } from './DTO/update-marca.dto';
import { Marca } from './entity/marca.entity';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  // GET /api/marca
  @Get()
  findAll(): Promise<Marca[]> {
    return this.marcaService.findAll();
  }

  // GET /api/marca/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Marca> {
    return this.marcaService.findOne(id);
  }

  // POST /api/marca
  @Post()
  create(@Body() createMarcaDto: CreateMarcaDto): Promise<Marca> {
    return this.marcaService.create(createMarcaDto);
  }

  // PUT /api/marca/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateMarcaDto: UpdateMarcaDto,
  ): Promise<Marca> {
    return this.marcaService.update(id, updateMarcaDto);
  }

  // DELETE /api/marca/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.marcaService.remove(id);
  }
}