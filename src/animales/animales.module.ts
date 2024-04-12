import { Module } from '@nestjs/common';
import { AnimalesService } from './animales.service';
import { AnimalesController } from './animales.controller';
import { Animal, AnimalSchema } from './entities/animale.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [AnimalesController],
  providers: [AnimalesService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Animal.name,
        schema: AnimalSchema,
      },
    ]),
  ],
})
export class AnimalesModule {}
