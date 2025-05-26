import { Test, TestingModule } from '@nestjs/testing';
import { StagaireService } from './stagaire.service';

describe('StagaireService', () => {
  let service: StagaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StagaireService],
    }).compile();

    service = module.get<StagaireService>(StagaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
