import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseMetadataService } from './database-metadata.service';

@Controller('metadatas')
export class DatabaseMetadataController {
    constructor(private databaseMetadataService: DatabaseMetadataService) {}
    @Get("/create")
    create() {
      return this.databaseMetadataService.createMetadata();
    }

    @Get()
    getMetadatas() {
      return this.databaseMetadataService.getAllMetadatas();
    }
    @Get(":id")
    getMetadatasById(@Param('id') id:string){
        return this.databaseMetadataService.getMetadatasById(id)
    }
    @Get(":id/analysis")
    getAnalysis(@Param('id') id:string){
        return this.databaseMetadataService.getAnalysis(id)
    }

    @Get(":id/table/:tableName")
    getTableMetadata(@Param('id') id:string,
                     @Param('tableName') tableName:string){
        return this.databaseMetadataService.getTableMetadata(id,tableName)
    }
}
