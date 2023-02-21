import { Global, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { DataBaseMetadata, DataBaseMetadataDocument } from "./schema/database-metadata.schema";


@Injectable()
export class DataBaseMetadatasRepository {
    constructor(@InjectModel(DataBaseMetadata.name) private DataBaseMetadataModel: Model<DataBaseMetadataDocument>) {}

    async findOne(metadatasFilterQuery: FilterQuery<DataBaseMetadata>): Promise<DataBaseMetadata> {
        return this.DataBaseMetadataModel.findOne(metadatasFilterQuery);
    }

    async find(metadatasFilterQuery: FilterQuery<DataBaseMetadata>): Promise<DataBaseMetadata[]> {
        return this.DataBaseMetadataModel.find(metadatasFilterQuery).exec()
    }

    async findNested(metadatasFilterQuery: FilterQuery<DataBaseMetadata>): Promise<DataBaseMetadata[]> {
        return this.DataBaseMetadataModel.aggregate([
            {
              '$lookup': {
                'from': 'table_metadata', 
                'localField': 'tables', 
                'foreignField': '_id', 
                'as': 'tables'
              }
            }, {
              '$unwind': {
                'path': '$tables', 
                'preserveNullAndEmptyArrays': false
              }
            }, {
              '$lookup': {
                'from': 'column_metadata', 
                'localField': 'tables.columns', 
                'foreignField': '_id', 
                'as': 'tables.columns'
              }
            }, {
              '$group': {
                '_id': '$_id', 
                'hostName': {
                  '$first': '$hostName'
                }, 
                'type': {
                  '$first': '$type'
                }, 
                'tables': {
                  '$push': '$tables'
                }
              }
            }, {
              '$match': metadatasFilterQuery
            }
          ])
        }

    async create(metadata: DataBaseMetadata): Promise<DataBaseMetadata> {
        const newMetadata = new this.DataBaseMetadataModel(metadata);
        return newMetadata.save()
    }

    async findOneAndUpdate(metadatasFilterQuery: FilterQuery<DataBaseMetadata>, metadata: Partial<DataBaseMetadata>): Promise<DataBaseMetadata> {
        return this.DataBaseMetadataModel.findOneAndUpdate(metadatasFilterQuery, metadata, { new: true });
    }
    async getAnalysis(metadatasFilterQuery: FilterQuery<DataBaseMetadata>,columnFieldAnalysis:string): Promise<DataBaseMetadata[]> {
        const groupBy = `$tables.columns.${columnFieldAnalysis}`
        return this.DataBaseMetadataModel.aggregate(
            [
                {
                  '$match': metadatasFilterQuery
                }, {
                  '$lookup': {
                    'from': 'table_metadata', 
                    'localField': 'tables', 
                    'foreignField': '_id', 
                    'as': 'tables'
                  }
                }, {
                  '$unwind': {
                    'path': '$tables', 
                    'preserveNullAndEmptyArrays': true
                  }
                }, {
                  '$unwind': {
                    'path': '$tables.columns', 
                    'preserveNullAndEmptyArrays': true
                  }
                }, {
                  '$lookup': {
                    'from': 'column_metadata', 
                    'localField': 'tables.columns', 
                    'foreignField': '_id', 
                    'as': 'tables.columns'
                  }
                }, {
                  '$group': {
                    '_id': groupBy,
                    'count': {
                      '$sum': 1
                    }
                  }
                }, {
                  '$project': {
                    '_id': {
                      '$arrayElemAt': [
                        '$_id', 0
                      ]
                    }, 
                    'count': 1
                  }
                }
              ]
        )
    }
}