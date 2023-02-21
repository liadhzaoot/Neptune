import { Module } from '@nestjs/common';
import { ColumnMetadataService } from './column-metadata.service';
import { MetadataController } from './column-metadata.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnMetadata, ColumnMetadataSchema } from './schemas/columnMetadata.schema';
import { ColumnMetadatasRepository } from './column-metadata.repository';


@Module({
  imports:[MongooseModule.forFeature([{name: ColumnMetadata.name, schema: ColumnMetadataSchema}])],
  providers: [ColumnMetadataService,ColumnMetadatasRepository],
  controllers: [MetadataController],
  exports: [ColumnMetadataService]
})
export class ColumnMetadataModule {}
