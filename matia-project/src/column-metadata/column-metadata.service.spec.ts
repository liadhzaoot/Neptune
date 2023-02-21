import { Test, TestingModule } from '@nestjs/testing';
import { ColumnMetadataService } from './column-metadata.service';

describe('MetadataService', () => {
  let service: ColumnMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnMetadataService],
    }).compile();

    service = module.get<ColumnMetadataService>(ColumnMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
