import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseMetadataService } from './database-metadata.service';

describe('DatabaseMetadataService', () => {
  let service: DatabaseMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseMetadataService],
    }).compile();

    service = module.get<DatabaseMetadataService>(DatabaseMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
