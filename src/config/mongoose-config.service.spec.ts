import { Test, TestingModule } from '@nestjs/testing';
import { MongooseConfigService } from './mongoose-config.service';

describe('MongooseConfigService', () => {
  let service: MongooseConfigService;
  
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongooseConfigService],
    }).compile();
    service = module.get<MongooseConfigService>(MongooseConfigService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
