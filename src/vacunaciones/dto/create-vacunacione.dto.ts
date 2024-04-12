import { IsArray, IsDate, IsString } from 'class-validator';
import { Animal } from 'src/animales/entities/animale.entity';

export class CreateVacunacioneDto {
  @IsArray()
  @IsString({ each: true }) // Validar que cada elemento de la matriz sea una cadena (ID)
  animales!: string[]; // Cambiar a una matriz de IDs de animales
}
