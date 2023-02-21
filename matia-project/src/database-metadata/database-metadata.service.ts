import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ObjectId, Types } from 'mongoose';
import { ColumnMetadataService } from 'src/column-metadata/column-metadata.service';
import { Database } from 'src/dbs/database';
import { DbFactory } from 'src/dbs/dbFactory';
import { MysqlFactory } from 'src/dbs/mysql/mysqlFactory';
// import { PostgresFactory } from 'src/dbs/postgres/postgresFactory';
import { TableMetadataService } from 'src/table-metadata/table-metadata.service';
import { DataBaseMetadatasRepository } from './database.repository';

@Injectable()
export class DatabaseMetadataService {
    private factory:DbFactory[] = []
    private db:Database
    constructor(private readonly databaseMetadatasRepository: DataBaseMetadatasRepository,
        private readonly columnMetadataService: ColumnMetadataService,
        private readonly tableMetadataService: TableMetadataService) {
            this.factory[0] = new MysqlFactory();
            // this.factory[1] = new PostgresFactory();
        }


    async createMetadata(){
        try{
            for (let dbFactory of this.factory){
            this.db = await dbFactory.getDB()
            let columnMetadataDoc
            var columsInTableId = []
            var tableInDB = []
            const tables = await this.db.getAllTableNames()
            for (let tbName of tables) {
                const tableColumns = await this.db.getTableColumns(tbName)
                columsInTableId = []
                for (let column of tableColumns) {
                    const columnMetadata = await this.db.getColumnMetadata(tbName,column["COLUMN_NAME"])
                    const isDocExist = await this.columnMetadataService.isDocExist(tbName,column["COLUMN_NAME"])
                    if(!isDocExist){
                        columnMetadataDoc = await this.columnMetadataService.createMetadataDocument(columnMetadata[0],tbName,column["COLUMN_NAME"])
                        columsInTableId.push(columnMetadataDoc["_id"])
                    }
                }
                const tableDoc = await this.tableMetadataService.saveTableMetadata(tbName,columsInTableId,this.db)
                tableInDB.push(tableDoc["_id"])
            }
            const dbDoc = await this.saveDBMetadata(tableInDB)
            for (let tableId of tableInDB){
                await this.tableMetadataService.addDBId(tableId,dbDoc["_id"])
            }
        }
            return {msg:"done :)"}
        }
    

        catch(error){
            throw new HttpException(`there is a problem \n ${error}`,HttpStatus.BAD_REQUEST);
        }
            }
    

    async saveDBMetadata(tablesObjectId:ObjectId[]){
        const metadata = await this.db.getConnectionMetadata()
        return this.databaseMetadatasRepository.create({
            tables:tablesObjectId,
            hostName:metadata["host"],
            type:metadata["type"]
        })
    }

    async getAllMetadatas(){
        try{
       return await this.databaseMetadatasRepository.findNested({})
        }
        catch(err){
            throw new HttpException("there is a problem",HttpStatus.BAD_REQUEST);
        }
    }
    async getMetadatasById(id:string){
        try{
        return await this.databaseMetadatasRepository.findNested({_id: new Types.ObjectId(id)})
        }
        catch(err){
            throw new HttpException("there is a problem",HttpStatus.BAD_REQUEST);
        }
     }

    async getTableMetadata(id:string,tableName:string){
        try{
        return await this.tableMetadataService.getTableMetadata(new Types.ObjectId(id),tableName)
        }catch(err){
            throw new HttpException("there is a problem",HttpStatus.BAD_REQUEST);
 
        }
     }
    
     async getAnalysis(id:string){
        try{
        let response = {}
        response["dataType"] = await this.databaseMetadatasRepository.getAnalysis({_id:new Types.ObjectId(id)},"dataType")
        response["Nullable"] = await this.databaseMetadatasRepository.getAnalysis({_id:new Types.ObjectId(id)},"isNullable")
        return response
        }
        catch(error){
            throw new HttpException("there is a problem",HttpStatus.BAD_REQUEST);
        }
     }
}
