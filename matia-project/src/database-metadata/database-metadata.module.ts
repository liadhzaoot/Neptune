import { Module } from '@nestjs/common';
import { DatabaseMetadataService } from './database-metadata.service';
import { DatabaseMetadataController } from './database-metadata.controller';
import { DataBaseMetadatasRepository } from './database.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { DataBaseMetadata, DataBaseMetadataSchema } from './schema/database-metadata.schema';
import { TableMetadataModule } from 'src/table-metadata/table-metadata.module';
import { ColumnMetadataModule } from 'src/column-metadata/column-metadata.module';

@Module({
  imports:[MongooseModule.forFeature([{name: DataBaseMetadata.name, schema: DataBaseMetadataSchema}]),
  TableMetadataModule,
  ColumnMetadataModule],
  providers: [DatabaseMetadataService,DataBaseMetadatasRepository],
  controllers: [DatabaseMetadataController],
})
export class DatabaseMetadataModule {}
