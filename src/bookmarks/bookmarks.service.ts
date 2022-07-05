import { Injectable } from '@nestjs/common';
import { BookmarksRepository } from './Bookmarks.repository';
import { CreateBookmarkInput } from './dto/input/create-Bookmark-input.dto';
import { BookmarkDocument } from './models/Bookmark.schema';

@Injectable()
export class BookmarksService {
    constructor(private readonly BookmarksRepository: BookmarksRepository) {}
    async createBookmark(
        createBookmarkData: CreateBookmarkInput,
        userId: string
    ) {
        const BookmarkDocument = await this.BookmarksRepository.create({
            ...createBookmarkData,
            links: [],
            userId,
        });
        return this.toModel(BookmarkDocument);
    }

    private toModel(BookmarkDocument: BookmarkDocument) {
        return {
            i: BookmarkDocument._id.toHexString(),
            ...BookmarkDocument,
        };
    }
}
