import { Injectable } from '@nestjs/common';
import { CreateVacunacioneDto } from './dto/create-vacunacione.dto';
import { UpdateVacunacioneDto } from './dto/update-vacunacione.dto';
import { Vacunacion } from './entities/vacunacione.entity';
import { Animal } from 'src/animales/entities/animale.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

/*Import Fuction reusable*/
import {
  resultMessageUpdate,
  resultMessageDelete,
} from '../animales/animales.service';
import { DeleteVacunacionResponse } from './interfaces/deleteVacunacion.response';

@Injectable()
export class VacunacionesService {
  constructor(
    @InjectModel(Animal.name)
    private AnimalModel: Model<Animal>,
    @InjectModel(Vacunacion.name)
    private VacunacionModel: Model<Vacunacion>,
  ) {}

  async create(createVacunacioneDto: CreateVacunacioneDto) {
    // Obtener los datos completos de los animales basados en sus IDs
    const animalesIds = createVacunacioneDto.animales;
    const animales = await Promise.all(
      animalesIds.map(async (animalId) => {
        return await this.AnimalModel.findById(animalId).exec();
      }),
    );

    // Crear un nuevo registro de vacunación con los datos completos de los animales y la fecha proporcionada
    const nuevaVacunacion = new this.VacunacionModel({
      animales: animales,
      fecha: new Date(),
    });

    // Guardar el nuevo registro de vacunación en la base de datos
    return await nuevaVacunacion.save();
  }

  findAll() {
    return this.VacunacionModel.find();
  }

  findOne(id: string) {
    return this.VacunacionModel.findById(id);
  }

  async update(id: string, updateVacunacioneDto: UpdateVacunacioneDto) {
    const animalesIds = updateVacunacioneDto.animales;
    const animales = await Promise.all(
      animalesIds.map(async (animalId) => {
        return await this.AnimalModel.findById(animalId).exec();
      }),
    );
    try {
      const result = await this.VacunacionModel.updateOne(
        { _id: id },
        { $set: { animales: animales } }, // Actualizar el campo "animales"
      );
      const messageResult = resultMessageUpdate(result);
      return messageResult;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    const result: DeleteVacunacionResponse =
      await this.VacunacionModel.deleteOne({
        _id: id,
      });
    const resultMenssage = resultMessageDelete(result);
    return resultMenssage;
  }
}
