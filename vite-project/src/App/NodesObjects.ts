export interface ColumnNode{
    columnKey:string,
    columnName:string,
    columnType:string,
    dataType:string,
    isNullable:boolean,
    privileges:string,
    tableName:string,
}
export interface IndexesNode{
    keyName:string,
    indexes:string,
    IndexType:string,
}
export interface TableNode{
    createdAt:string,
    indexes:IndexesNode,
    tableName:string,
}

export interface DbNode{
    hostName:string,
    type:string,
}