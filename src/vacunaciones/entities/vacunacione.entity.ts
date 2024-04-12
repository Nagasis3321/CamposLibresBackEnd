import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Animal } from 'src/animales/entities/animale.entity';

@Schema()
export class Vacunacion {
  @Prop({ required: true })
  animales: Animal[];
  @Prop({ required: true })
  fecha: Date;
}

export const VacunacionSchema = SchemaFactory.createForClass(Vacunacion);
VacunacionSchema.index({ animales: 1, fecha: 1 }, { unique: true });
