import { Logger, NotFoundException } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    // get logs if there's an error
    protected abstract readonly logger: Logger;
    // create abstract class that will be extended in users.service.ts
    constructor(protected readonly model: Model<TDocument>) {}
    async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
        const createdDocument = new this.model({ ...document, _id: new Types.ObjectId() });
        (await createdDocument.save()).toJSON();
        return (await createdDocument.save()).toJSON() as unknown as TDocument;
    }
    // FindOne
    async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery, {}, { lean: true });
        if (!document) {
            this.logger.warn('No document found with this filterQuery', filterQuery);
            throw new NotFoundException('Document Not Found !');
        }
        return document;
    }
    //
}
