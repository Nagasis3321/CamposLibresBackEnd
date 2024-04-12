import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DuenosService } from './duenos.service';
import { CreateDuenoDto } from './dto/create-dueno.dto';
import { UpdateDuenoDto } from './dto/update-dueno.dto';

@Controller('duenos')
export class DuenosController {
  constructor(private readonly duenosService: DuenosService) {}

  @Post()
  create(@Body() createDuenoDto: CreateDuenoDto) {
    return this.duenosService.create(createDuenoDto);
  }

  @Get()
  findAll() {
    return this.duenosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.duenosService.findOne(cleanId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDuenoDto: UpdateDuenoDto) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.duenosService.update(cleanId, updateDuenoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.duenosService.remove(cleanId);
  }
}
