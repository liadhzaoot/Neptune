import { Global, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";

import { ColumnMetadata, ColumnMetadataDocument } from "./schemas/columnMetadata.schema";

@Injectable()
export class ColumnMetadatasRepository {
    constructor(@InjectModel(ColumnMetadata.name) private columnMetadataModel: Model<ColumnMetadataDocument>) {}

    async findOne(metadatasFilterQuery: FilterQuery<ColumnMetadata>): Promise<ColumnMetadata> {
        return this.columnMetadataModel.findOne(metadatasFilterQuery);
    }

    async find(metadatasFilterQuery: FilterQuery<ColumnMetadata>): Promise<ColumnMetadata[]> {
        return this.columnMetadataModel.find(metadatasFilterQuery)
    }

    async create(metadata: ColumnMetadata): Promise<ColumnMetadata> {
        const newMetadata = new this.columnMetadataModel(metadata);
        return newMetadata.save()
    }

    async findOneAndUpdate(metadatasFilterQuery: FilterQuery<ColumnMetadata>, metadata: Partial<ColumnMetadata>): Promise<ColumnMetadata> {
        return this.columnMetadataModel.findOneAndUpdate(metadatasFilterQuery, metadata, { new: true });
    }
}