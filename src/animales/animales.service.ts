import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnimaleDto } from './dto/create-animale.dto';
import { updateAnimalResponse } from './interfaces/updateAnimal.response';
import { InjectModel } from '@nestjs/mongoose';
import { Animal } from './entities/animale.entity';
import { Model } from 'mongoose';
import { UpdateAnimaleDto } from './dto/update-animale.dto';
import { DeleteAnimalResponse } from './interfaces/deleteAnimal.response';
import { postAnimalResponse } from './interfaces/postAnimal.response';

@Injectable()
export class AnimalesService {
  constructor(
    @InjectModel(Animal.name)
    private AnimalModel: Model<Animal>,
  ) {}
  async create(
    createAnimaleDto: CreateAnimaleDto,
  ): Promise<postAnimalResponse> {
    try {
      const newAnimal = new this.AnimalModel(createAnimaleDto);
      const savedAnimal = await newAnimal.save();
      return savedAnimal.toJSON() as postAnimalResponse;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Caravana: ${createAnimaleDto.idCaravana} + Pelaje: ${createAnimaleDto.idCaravana} + Sexo : ${createAnimaleDto.sexo} + Edad : ${createAnimaleDto.edad} already exists`,
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.AnimalModel.find();
  }

  findOne(id: string) {
    return this.AnimalModel.findById(id);
  }

  async update(id: string, updateAnimaleDto: UpdateAnimaleDto) {
    try {
      const result = await this.AnimalModel.updateOne(
        { _id: id },
        updateAnimaleDto,
      );
      const messageResult = resultMessageUpdate(result);
      return messageResult;
    } catch {}
  }

  async remove(id: string) {
    const result: DeleteAnimalResponse = await this.AnimalModel.deleteOne({
      _id: id,
    });
    const resultMenssage = resultMessageDelete(result);
    return resultMenssage;
  }
}

export function resultMessageUpdate(result: updateAnimalResponse): string {
  if (result.acknowledged) {
    if (result.matchedCount > 0) {
      if (result.modifiedCount > 0) {
        return 'La operación fue exitosa y se modificaron los datos.';
      } else if (result.upsertedCount > 0) {
        return 'La operación fue exitosa y se insertaron nuevos datos.';
      } else {
        return 'La operación fue exitosa pero no se modificaron los datos.';
      }
    } else {
      return 'No se encontraron datos que coincidan.';
    }
  } else {
    throw new BadRequestException('La operación no fue reconocida.');
  }
}

export function resultMessageDelete(result: DeleteAnimalResponse): string {
  if (result.acknowledged) {
    if (result.deletedCount > 0) {
      return 'Delete Object completed';
    } else {
      return 'Not found the task register with this id';
    }
  } else {
    throw new BadRequestException('Operation not founded');
  }
}
