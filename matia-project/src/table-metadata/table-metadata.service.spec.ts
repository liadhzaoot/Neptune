import { Test, TestingModule } from '@nestjs/testing';
import { TableMetadataService } from './table-metadata.service';

describe('TableMetadataService', () => {
  let service: TableMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableMetadataService],
    }).compile();

    service = module.get<TableMetadataService>(TableMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
