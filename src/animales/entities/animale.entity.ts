import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Animal {
  _id: string;

  @Prop({ required: true })
  dniDueno: string;

  @Prop({ required: true })
  idPelaje: string;

  @Prop({ required: true })
  idCaravana: string;

  @Prop({ required: true })
  sexo: string;

  @Prop({ required: true })
  edad: string;
}

export const AnimalSchema = SchemaFactory.createForClass(Animal);
AnimalSchema.index(
  { idPelaje: 1, idCaravana: 1, edad: 1, sexo: 1 },
  { unique: true },
);
