import { Module } from '@nestjs/common';
import { DuenosService } from './duenos.service';
import { DuenosController } from './duenos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dueno, duenoSchema } from './entities/dueno.entity';

@Module({
  controllers: [DuenosController],
  providers: [DuenosService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Dueno.name,
        schema: duenoSchema,
      },
    ]),
  ],
})
export class DuenosModule {}
