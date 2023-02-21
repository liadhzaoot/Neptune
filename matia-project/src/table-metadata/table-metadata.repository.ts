import { Global, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { TableMetadata, TableMetadataDocument } from "./schema/table-metadata.schema";


@Injectable()
export class TableMetadatasRepository {
    constructor(@InjectModel(TableMetadata.name) private tableMetadataModel: Model<TableMetadataDocument>) {}

    async findOne(metadatasFilterQuery: FilterQuery<TableMetadata>): Promise<TableMetadata> {
        return this.tableMetadataModel.findOne(metadatasFilterQuery);
    }

    async find(metadatasFilterQuery: FilterQuery<TableMetadata>): Promise<TableMetadata[]> {
        return this.tableMetadataModel.find(metadatasFilterQuery)
    }

    async findNested(metadatasFilterQuery: FilterQuery<TableMetadata>): Promise<TableMetadata[]> {
       return this.tableMetadataModel.aggregate([
            {
              '$lookup': {
                'from': 'column_metadata', 
                'localField': 'columns', 
                'foreignField': '_id', 
                'as': 'columns'
              }
            }, {
              '$match': metadatasFilterQuery
            }
          ])
    }

    async create(metadata: TableMetadata): Promise<TableMetadata> {
        const newMetadata = new this.tableMetadataModel(metadata);
        return newMetadata.save()
    }

    async findOneAndUpdate(metadatasFilterQuery: FilterQuery<TableMetadata>, metadata: Partial<TableMetadata>): Promise<TableMetadata> {
        return this.tableMetadataModel.findOneAndUpdate(metadatasFilterQuery, metadata, { new: true });
    }
}