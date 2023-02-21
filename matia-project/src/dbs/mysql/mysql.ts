import { Database } from '../database';
import { DataSource } from 'typeorm';

export class Mysql implements Database {
  private static instance: Mysql;
  mysqlDataSource:DataSource
  constructor(){
  }

  public static async getInstance(): Promise<Database> {
    if (!Mysql.instance) {
      const instance = new Mysql();
      await instance.connect();
      Mysql.instance = instance;
    }
    return Mysql.instance;
  }
 async connect(){
    this.mysqlDataSource = new DataSource({
      type: 'mysql',
      host: 'db-mysql-fra1-34308-do-user-12567408-0.b.db.ondigitalocean.com',
      port: 25060,
      username: 'doadmin',
      password: 'AVNS_4tlJCr1GK1KlyayFyKf',
      database: 'defaultdb',
      entities: [],
      synchronize: true,
    });

    await this.mysqlDataSource.initialize()
    return this.mysqlDataSource;
  }
  async getColumnMetadata(tableName: string, columnName: string) {
    return this.mysqlDataSource.query(`SELECT column_name,
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
  return {host:this.mysqlDataSource.options["host"], type:this.mysqlDataSource.options["type"]}
}
async getAllTableNames(): Promise<string[]> {
  let tablesNameArry:string[] = []
  const tables =  await this.mysqlDataSource.query(`SHOW TABLES from defaultdb`)
  for(let i = 0; i < tables.length; i++){
    tablesNameArry[i] = tables[i]["Tables_in_defaultdb"]
  }
  return tablesNameArry
}
getTableColumns(tableName: String): Promise<[{}]> {
  return this.mysqlDataSource.query(`SELECT COLUMN_NAME
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_NAME = '${tableName}'`)
}
async getTableCreatedAt(tableName: String) {
  const createdAt = await this.mysqlDataSource.query(`SELECT CREATE_TIME
  FROM INFORMATION_SCHEMA.TABLES
  WHERE TABLE_NAME = '${tableName}';`)
  const dateString = createdAt[0]["CREATE_TIME"]
  const date = new Date(dateString);
  return date
}
async getTableIndexes(tableName: String) {
  const indexes = await this.mysqlDataSource.query(`SHOW INDEXES FROM ${tableName};`)
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
