import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDuenoDto } from './dto/create-dueno.dto';
import { UpdateDuenoDto } from './dto/update-dueno.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Dueno } from './entities/dueno.entity';
import { Model } from 'mongoose';
import { postAnimalResponse } from 'src/animales/interfaces/postAnimal.response';
import {
  resultMessageUpdate,
  resultMessageDelete,
} from 'src/animales/animales.service';
import { GetDuenoResponse } from './interfaces/getDueno.response';
@Injectable()
export class DuenosService {
  constructor(
    @InjectModel(Dueno.name)
    private DuenoModel: Model<Dueno>,
  ) {}
  async create(createDuenoDto: CreateDuenoDto): Promise<postAnimalResponse> {
    try {
      const newDueno = new this.DuenoModel(createDuenoDto);
      const savedDueno = await newDueno.save();
      return savedDueno.toJSON() as postAnimalResponse;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `Dni: ${createDuenoDto.dni}already exists or Check abbreviation possibly in use`,
        );
      }
    }

    return;
  }

  async findAll(): Promise<GetDuenoResponse[]> {
    return this.DuenoModel.find();
  }

  findOne(id: string): Promise<GetDuenoResponse> {
    return this.DuenoModel.findById(id);
  }

  async update(id: string, updateDuenoDto: UpdateDuenoDto) {
    try {
      const result = await this.DuenoModel.updateOne(
        { _id: id },
        updateDuenoDto,
      );
      const messageResult = resultMessageUpdate(result);
      return messageResult;
    } catch (error) {}
  }
  async remove(id: string) {
    /* const result = await this.DuenoModel.deleteOne({
      _id: id,
    });
    const resultMenssage = resultMessageDelete(result);
    return resultMenssage;*/
    return await this.DuenoModel.deleteOne({
      _id: id,
    });
  }
}
