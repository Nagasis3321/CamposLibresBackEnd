import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { UpdateAnimaleDto } from './dto/update-animale.dto';
import { GetAnimalResponse } from './interfaces/getAnimal.response';
import { postAnimalResponse } from './interfaces/postAnimal.response';

@Controller('animales')
export class AnimalesController {
  constructor(private readonly animalesService: AnimalesService) {}

  @Post()
  async create(
    @Body() createAnimaleDto: CreateAnimaleDto,
  ): Promise<postAnimalResponse> {
    return this.animalesService.create(createAnimaleDto);
  }

  @Get()
  async findAll(): Promise<GetAnimalResponse[]> {
    const animales = await this.animalesService.findAll();
    const animalesResponse = animales.map((animal) => ({
      _id: animal._id,
      dniDueno: animal.dniDueno,
      idPelaje: animal.idPelaje,
      idCaravana: animal.idCaravana,
      sexo: animal.sexo,
      edad: animal.edad,
      __v: animal.__v,
    }));
    return animalesResponse;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<GetAnimalResponse> {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"
    const animal = await this.animalesService.findOne(cleanId);
    return {
      _id: animal._id,
      dniDueno: animal.dniDueno,
      idPelaje: animal.idPelaje,
      idCaravana: animal.idCaravana,
      sexo: animal.sexo,
      edad: animal.edad,
      __v: animal.__v,
    };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnimaleDto: UpdateAnimaleDto) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.animalesService.update(cleanId, updateAnimaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const cleanId = id.slice(1); // Elimina el primer carácter, que es ":"

    return this.animalesService.remove(cleanId);
  }
}
