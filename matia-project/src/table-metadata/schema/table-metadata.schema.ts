import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type TableMetadataDocument = HydratedDocument<TableMetadata>;
@Schema()
export class Index{
  @Prop()
  columnName:String
  @Prop()
  keyName:String
  @Prop()
  IndexType:String
}
export const IndexSchema = SchemaFactory.createForClass(Index);

@Schema({collection:'table_metadata'})
export class TableMetadata {
  @Prop()
  tableName: String;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'ColumnMetadata'})
  columns: mongoose.Schema.Types.ObjectId[];

  @Prop()
  createdAt: Date;

  @Prop()
  indexes: Index[];

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'DataBaseMetadata'})
  dbId: mongoose.Schema.Types.ObjectId
}

export const TableMetadataSchema = SchemaFactory.createForClass(TableMetadata);