import { Injectable } from '@nestjs/common';
import { BookmarksRepository } from './bookmarks.repository';
import { CreateBookmarkInput } from './dto/input/create-bookmark-input.dto';
import { BookmarkDocument } from './models/bookmark.schema';
import { GetBookmarkArgs } from './dto/args/get-bookmark-args.dto';
import { UpdateBookmarkInput } from './dto/input/update-bookmark-input.dto';
import { User } from 'src/users/models/user.model';

@Injectable()
export class BookmarksService {
    constructor(private readonly bookmarksRepository: BookmarksRepository) {}
    // Bookmarks CRUD Operations
    //
    // Create bookmark
    async createBookmark(
        createBookmarkData: CreateBookmarkInput,
        userId: string
    ) {
        const bookmarkDocument = await this.bookmarksRepository.create({
            ...createBookmarkData,
            links: [],
            userId,
        });
        return this.toModel(bookmarkDocument);
    }
    // Update bookmark
    async updateBookmark(
        updateBookmarkData: UpdateBookmarkInput,
        userId: string
    ) {
        const bookmarkDocument =
            await this.bookmarksRepository.findOneAndUpdate(
                { _id: updateBookmarkData._id, userId },
                updateBookmarkData
            );
        return this.toModel(bookmarkDocument);
    }
    // Get all
    async getBookmarks(userId: string) {
        const bookmarkDocuments = await this.bookmarksRepository.find({
            userId,
        });
        return bookmarkDocuments.map((bookmark) => this.toModel(bookmark));
    }
    // Get one
    async getBookmark(getBookmarkArgs: GetBookmarkArgs, userId: string) {
        const bookmarkDocument = await this.bookmarksRepository.findOne({
            ...getBookmarkArgs,
            userId,
        });
        return this.toModel(bookmarkDocument);
    }
    // Utility functions
    private toModel(bookmarkDocument: BookmarkDocument) {
        return {
            _id: bookmarkDocument._id.toHexString(),
            ...bookmarkDocument,
        };
    }
}
