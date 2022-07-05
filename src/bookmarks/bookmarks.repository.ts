import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '../database/abstract.repository';
import { BookmarkDocument } from './models/Bookmark.schema';
import { Bookmark } from './models/Bookmark.model';
import { Model } from 'mongoose';

@Injectable()
export class BookmarksRepository extends AbstractRepository<BookmarkDocument> {
    protected readonly logger = new Logger(BookmarksRepository.name);
    constructor(
        @InjectModel(Bookmark.name) BookmarkModel: Model<BookmarkDocument>
    ) {
        super(BookmarkModel);
    }
}
