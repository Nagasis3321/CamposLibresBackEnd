import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacunacionesService } from './vacunaciones.service';
import { CreateVacunacioneDto } from './dto/create-vacunacione.dto';
import { UpdateVacunacioneDto } from './dto/update-vacunacione.dto';

@Controller('vacunaciones')
export class VacunacionesController {
  constructor(private readonly vacunacionesService: VacunacionesService) {}

  @Post()
  create(@Body() createVacunacioneDto: CreateVacunacioneDto) {
    return this.vacunacionesService.create(createVacunacioneDto);
  }

  @Get()
  findAll() {
    return this.vacunacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.vacunacionesService.findOne(cleanId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVacunacioneDto: UpdateVacunacioneDto,
  ) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.vacunacionesService.update(cleanId, updateVacunacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.vacunacionesService.remove(cleanId);
  }
}
