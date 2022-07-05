import { Module } from '@nestjs/common';
import { BookmarksResolver } from './Bookmarks.resolver';
import { BookmarksService } from './Bookmarks.service';
import { BookmarksRepository } from './Bookmarks.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BookmarkSchema } from './models/Bookmark.schema';
import { Bookmark } from './models/Bookmark.model';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Bookmark.name,
                schema: BookmarkSchema,
            },
        ]),
    ],
    providers: [BookmarksResolver, BookmarksService, BookmarksRepository],
})
export class BookmarksModule {}
