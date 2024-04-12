import { PartialType } from '@nestjs/mapped-types';
import { CreateVacunacioneDto } from './create-vacunacione.dto';

export class UpdateVacunacioneDto extends PartialType(CreateVacunacioneDto) {}
