import { Test, TestingModule } from '@nestjs/testing';
import { AnimalesController } from './animales.controller';
import { AnimalesService } from './animales.service';

describe('AnimalesController', () => {
  let controller: AnimalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnimalesController],
      providers: [AnimalesService],
    }).compile();

    controller = module.get<AnimalesController>(AnimalesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
