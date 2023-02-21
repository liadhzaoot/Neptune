import { Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ColumnMetadataService } from './column-metadata.service';
import { ColumnMetadata } from './schemas/columnMetadata.schema';

@Controller("/column-metadata")
export class MetadataController {
    constructor(private metadataService: ColumnMetadataService){}
@Get()
async getColumnMetadata(){

    return this.metadataService.liadTest()
}
}




