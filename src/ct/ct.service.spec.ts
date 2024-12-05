import { Test, TestingModule } from '@nestjs/testing';
import { CtService } from './ct.service';

describe('CtService', () => {
  let service: CtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CtService],
    }).compile();

    service = module.get<CtService>(CtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
