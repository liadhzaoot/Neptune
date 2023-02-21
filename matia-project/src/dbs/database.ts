export interface Database{
    connect(type:string,host:string,port:number,username:string,password:string,database:string):any
    getColumnMetadata(tableName:string,columnName:string):any
    getConnectionMetadata()
    getAllTableNames():Promise<string[]>
    getTableColumns(tableName:String):Promise<[{}]>
    getColumnMetadata(tableName:String, columnName:String)
    getTableCreatedAt(tableName:String)
    getTableIndexes(tableName:String)
}
