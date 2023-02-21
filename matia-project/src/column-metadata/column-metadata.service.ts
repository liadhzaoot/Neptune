import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DbFactory } from 'src/dbs/dbFactory';
import { MysqlFactory } from 'src/dbs/mysql/mysqlFactory';
import { ColumnMetadatasRepository } from './column-metadata.repository';
import { ColumnMetadata } from './schemas/columnMetadata.schema';

@Injectable()
export class ColumnMetadataService {
    constructor(private readonly columnMetadatasRepository: ColumnMetadatasRepository) {}

    async getAllMetadata(): Promise<ColumnMetadata[]> {
        return this.columnMetadatasRepository.find({})
    }
    async isDocExist(tableName:String, columnName:String): Promise<boolean> {
        const columnDoc = await this.columnMetadatasRepository.find({
            tableName,
            columnName
        })
        return (columnDoc.length == 0)? false:true;
    } 

    async createMetadataDocument(columnMetadata:any,tableName:String,columnName:String){
        try{
            let columnMetadataDoc
                columnMetadataDoc = await this.columnMetadatasRepository.create({
                    tableName,
                    columnName,
                    dataType: columnMetadata["DATA_TYPE"],
                    characterMaximumLength: columnMetadata["CHARACTER_MAXIMUM_LENGHT"],
                    isNullable: columnMetadata["IS_NULLABLE"] == "NO"?false:true,
                    columnType: columnMetadata["COLUMN_TYPE"],
                    columnKey: columnMetadata["COLUMN_KEY"],
                    privileges: columnMetadata["PRIVILEGES"],
                })
                return columnMetadataDoc
            }
            catch (error){
                return error
            }
            
    
}
    async liadTest(){


    }
}
