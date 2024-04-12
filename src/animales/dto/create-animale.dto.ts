import { IsString } from 'class-validator';

export class CreateAnimaleDto {
  @IsString()
  idCaravana!: string;
  @IsString()
  dniDueno!: string;
  @IsString()
  idPelaje!: string;
  @IsString()
  sexo!: string;
  @IsString()
  edad!: string;
}
