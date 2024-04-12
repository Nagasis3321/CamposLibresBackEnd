import { Test, TestingModule } from '@nestjs/testing';
import { VacunacionesController } from './vacunaciones.controller';
import { VacunacionesService } from './vacunaciones.service';

describe('VacunacionesController', () => {
  let controller: VacunacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacunacionesController],
      providers: [VacunacionesService],
    }).compile();

    controller = module.get<VacunacionesController>(VacunacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
