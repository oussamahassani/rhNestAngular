import { Test, TestingModule } from '@nestjs/testing';
import { StagaireController } from './stagaire.controller';



describe('StagaireController', () => {
  let controller: StagaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StagaireController],
    }).compile();

    controller = module.get<StagaireController>(StagaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
