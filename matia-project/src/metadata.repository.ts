import { Global, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model,ObjectId } from "mongoose";

interface IWithId extends Document {
    _id: ObjectId
  }

@Injectable()
export class BaseRepository<T> {
    constructor(private model: Model< T >) {}

    async findOne(metadatasFilterQuery: FilterQuery<T>): Promise<T> {
        return this.model.findOne(metadatasFilterQuery);
    }

    async find(metadatasFilterQuery: FilterQuery<T>): Promise<T[]> {
        return this.model.find(metadatasFilterQuery)
    }

    async create(metadata: T): Promise<T> {
        return this.model.create(metadata);
    }

    async findOneAndUpdate(metadatasFilterQuery: FilterQuery<T>, metadata: Partial<T>): Promise<T> {
        return this.model.findOneAndUpdate(metadatasFilterQuery, metadata, { new: true });
    }
}