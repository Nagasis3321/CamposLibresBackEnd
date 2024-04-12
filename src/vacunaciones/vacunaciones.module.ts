import { Module } from '@nestjs/common';
import { VacunacionesService } from './vacunaciones.service';
import { VacunacionesController } from './vacunaciones.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Animal, AnimalSchema } from 'src/animales/entities/animale.entity';
import { Vacunacion, VacunacionSchema } from './entities/vacunacione.entity';

@Module({
  controllers: [VacunacionesController],
  providers: [VacunacionesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Animal.name,
        schema: AnimalSchema,
      },
      {
        name: Vacunacion.name,
        schema: VacunacionSchema,
      },
    ]),
  ],
})
export class VacunacionesModule {}
