import { IsString } from 'class-validator';

export class CreateDuenoDto {
  @IsString()
  dni!: string;
  @IsString()
  apellido!: string;
  @IsString()
  nombre!: string;
  @IsString()
  abreviatura!: string;
}
