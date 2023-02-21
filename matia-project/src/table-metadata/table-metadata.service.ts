import { Injectable } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { Database } from 'src/dbs/database';
import { TableMetadatasRepository } from './table-metadata.repository';

@Injectable()
export class TableMetadataService {
    constructor(private readonly tableMetadatasRepository: TableMetadatasRepository) {}
    async saveTableMetadata(tableName:String,columsInTableId:ObjectId[],db:Database){

        const createdAt = await db.getTableCreatedAt(tableName)
    
        const indexesDataDoc = await db.getTableIndexes(tableName)
        
        let tableDoc = await this.tableMetadatasRepository.create({
            tableName,
            columns: columsInTableId,
            createdAt: createdAt,
            indexes:indexesDataDoc,
            dbId:null
    
        })
        return tableDoc
    
    }
    async addDBId(tableId:ObjectId,dbId:ObjectId){
        this.tableMetadatasRepository.findOneAndUpdate({_id:tableId},{dbId:dbId})
    }

    async getTableMetadata(dbId:Types.ObjectId,tableName:string){
        return this.tableMetadatasRepository.findNested({tableName,dbId})
    }
}
