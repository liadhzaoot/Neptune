import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseMetadataModule } from 'src/database-metadata/database-metadata.module';
import { TableMetadatasRepository } from 'src/table-metadata/table-metadata.repository';
import { TableMetadata, TableMetadataSchema } from './schema/table-metadata.schema';
import { TableMetadataController } from './table-metadata.controller';
import { TableMetadataService } from './table-metadata.service';

@Module({
  imports:[MongooseModule.forFeature([{name: TableMetadata.name, schema: TableMetadataSchema}])],
  providers: [TableMetadataService,TableMetadatasRepository],
  controllers: [TableMetadataController],
  exports:[TableMetadataService]
})
export class TableMetadataModule {}
