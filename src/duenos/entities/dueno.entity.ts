import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Dueno {
  _id?: String;

  @Prop({ required: true })
  dni: String;
  @Prop({ required: true })
  apellido: string;
  @Prop({ required: true })
  nombre: string;
  @Prop({ required: true })
  abreviatura: string;
}

export const duenoSchema = SchemaFactory.createForClass(Dueno);
duenoSchema.index({ dni: 1 }, { unique: true });
duenoSchema.index({ abreviatura: 1 }, { unique: true });
