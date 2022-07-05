import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BookmarksService } from './Bookmarks.service';
import { Bookmark } from './models/Bookmark.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CreateBookmarkInput } from './dto/input/create-Bookmark-input.dto';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '../users/models/user.model';

@Resolver(() => Bookmark)
export class BookmarksResolver {
    constructor(private readonly BookmarksService: BookmarksService) {}
    @UseGuards(GqlAuthGuard)
    @Mutation(() => Bookmark)
    async createBookmark(
        @Args('createBookmarkData') createBookmarkData: CreateBookmarkInput,
        @CurrentUser() user: User
    ) {
        return this.BookmarksService.createBookmark(
            createBookmarkData,
            user._id
        );
    }
}
