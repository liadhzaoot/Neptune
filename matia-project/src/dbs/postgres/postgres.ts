import { Database } from '../database';
import { DataSource } from 'typeorm';

export class Postgres implements Database {
  private static instance: Postgres;
  postgresDataSource:DataSource
  constructor(){
  }

  public static async getInstance(): Promise<Database> {
    if (!Postgres.instance) {
      const instance = new Postgres();
      await instance.connect();
      Postgres.instance = instance;
    }
    return Postgres.instance;
  }
 async connect(){
    this.postgresDataSource = new DataSource({
      type: 'postgres',
      host: 'db-postgresql-nyc1-26835-do-user-12567408-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_cnh7MmSvzO7aRhAh1oV',
      database: 'pagila',
      entities: [],
      synchronize: true,
    });

    await this.postgresDataSource.initialize()
    return this.postgresDataSource;
  }
  async getColumnMetadata(tableName: string, columnName: string) {
    return this.postgresDataSource.query(`SELECT column_name,
    data_type,
    character_maximum_length, 
    is_nullable, 
    column_default,
    column_type,
    column_key,
    privileges
    FROM information_schema.columns
    WHERE table_name = '${tableName}' AND column_name = '${columnName}';`)
}
getConnectionMetadata() {
  return {host:this.postgresDataSource.options["host"], type:this.postgresDataSource.options["type"]}
}
async getAllTableNames(): Promise<string[]> {
    let tablesNameArry:string[] = []
  const tables =  await this.postgresDataSource.query(`SHOW TABLES from pagila`)
  for(let i = 0; i < tables.length; i++){
    tablesNameArry[i] = tables[i]["Tables_in_pagila"]
  }
  return tablesNameArry
  
}
getTableColumns(tableName: String): Promise<[{}]> {
  return this.postgresDataSource.query(`SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = '${tableName}'`)
}
async getTableCreatedAt(tableName: String) {
  const createdAt = await this.postgresDataSource.query(`SELECT CREATE_TIME
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_NAME = '${tableName}';`)
  const dateString = createdAt[0]["CREATE_TIME"]
  const date = new Date(dateString);
  return date
}
async getTableIndexes(tableName: String) {
  const indexes = await this.postgresDataSource.query(`SHOW INDEXES FROM ${tableName};`)
  let indexesDataDoc = []
  if (indexes){
      for (let index of indexes){
          indexesDataDoc.push({
              columnName: index["Column_name"],
              keyName: index["Key_name"],
              IndexType: index["Index_type"]
          })
      }
  }
  return indexesDataDoc

}
  
}
