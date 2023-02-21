import { Test, TestingModule } from '@nestjs/testing';
import { TableMetadataController } from './table-metadata.controller';

describe('TableMetadataController', () => {
  let controller: TableMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableMetadataController],
    }).compile();

    controller = module.get<TableMetadataController>(TableMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
