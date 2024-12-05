import { Test, TestingModule } from '@nestjs/testing';
import { VtService } from './vt.service';

describe('VtService', () => {
  let service: VtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VtService],
    }).compile();

    service = module.get<VtService>(VtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
