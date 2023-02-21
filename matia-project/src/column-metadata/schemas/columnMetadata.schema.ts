import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ColumnMetadataDocument = HydratedDocument<ColumnMetadata>;

@Schema({collection:'column_metadata'})
export class ColumnMetadata {

  @Prop()
  tableName: String;

  @Prop()
  columnName: String;

  @Prop()
  dataType: String;

  @Prop()
  characterMaximumLength: Number;

  @Prop()
  isNullable: Boolean;

  @Prop()
  columnType: String;

  @Prop()
  columnKey: String;

  @Prop()
  privileges: String;
}

export const ColumnMetadataSchema = SchemaFactory.createForClass(ColumnMetadata);