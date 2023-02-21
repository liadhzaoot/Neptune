import {  Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ColumnMetadataModule } from './column-metadata/column-metadata.module';
import { ColumnMetadataService } from './column-metadata/column-metadata.service';
import { TableMetadataModule } from './table-metadata/table-metadata.module';
import { TableMetadataService } from './table-metadata/table-metadata.service';
import { DatabaseMetadataModule } from './database-metadata/database-metadata.module';


@Module({
  imports: [
            ConfigModule.forRoot({isGlobal: true,}),
            MongooseModule.forRoot(process.env.MONGO_URL),
            ColumnMetadataModule,TableMetadataModule, DatabaseMetadataModule
          ],
  controllers: [],
  providers: [],
})
export class AppModule {}
