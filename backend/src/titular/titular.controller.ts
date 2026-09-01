import { Controller, Get, Post, Put, Delete, Body, Param, ParseUUIDPipe } from '@nestjs/common';
import { TitularService } from './titular.service';
import { CreateTitularDto } from './DTO/create-titular.dto';
import { UpdateTitularDto } from './DTO/update-titular.dto';
import { Titular } from './entity/titular.entity';

@Controller('titular')
export class TitularController {
  constructor(private readonly titularService: TitularService) {}

  // GET /api/titular
  @Get()
  findAll(): Promise<Titular[]> {
    return this.titularService.findAll();
  }

  // GET /api/titular/:id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Titular> {
    return this.titularService.findOne(id);
  }

  // POST /api/titular
  @Post()
  create(@Body() createTitularDto: CreateTitularDto): Promise<Titular> {
    return this.titularService.create(createTitularDto);
  }

  // PUT /api/titular/:id
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTitularDto: UpdateTitularDto,
  ): Promise<Titular> {
    return this.titularService.update(id, updateTitularDto);
  }

  // DELETE /api/titular/:id
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<{ message: string }> {
    return this.titularService.remove(id);
  }
}