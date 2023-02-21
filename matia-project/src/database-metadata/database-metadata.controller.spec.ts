import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseMetadataController } from './database-metadata.controller';

describe('DatabaseMetadataController', () => {
  let controller: DatabaseMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseMetadataController],
    }).compile();

    controller = module.get<DatabaseMetadataController>(DatabaseMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
