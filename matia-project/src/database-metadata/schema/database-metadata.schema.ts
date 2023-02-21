import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DataBaseMetadataDocument = HydratedDocument<DataBaseMetadata>;

@Schema({collection:'database_metadata'})
export class DataBaseMetadata {

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'DataBaseMetadata'})
  tables: mongoose.Schema.Types.ObjectId[];

  @Prop()
  hostName: String;

  @Prop()
  type: String;

}

export const DataBaseMetadataSchema = SchemaFactory.createForClass(DataBaseMetadata);