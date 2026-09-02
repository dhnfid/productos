import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { TurnoService } from './turno.service';
import { CreateTurnoDto } from './DTO/create-turno.dto';
import { UpdateTurnoDto } from './DTO/update-turno.dto';
import { Turno } from './entity/turno.entity';
import { UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';


@Controller('turno')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('turno')
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  // GET /api/turno
  @Get()
  findAll(): Promise<Turno[]> {
    return this.turnoService.findAll();
  }

  // GET /api/turno/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Turno> {
    return this.turnoService.findOne(id);
  }

  // POST /api/turno
  @Post()
  create(@Body() createTurnoDto: CreateTurnoDto): Promise<Turno> {
    return this.turnoService.create(createTurnoDto);
  }

  // PUT /api/turno/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTurnoDto: UpdateTurnoDto,
  ): Promise<Turno> {
    return this.turnoService.update(id, updateTurnoDto);
  }

  // DELETE /api/turno/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.turnoService.remove(id);
  }
}