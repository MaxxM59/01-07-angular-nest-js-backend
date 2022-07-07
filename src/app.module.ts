import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { BookmarksModule } from './Bookmarks/Bookmarks.module';
import { LinksModule } from './links/links.module';

@Module({
    imports: [
        // Mongo DB config & check port/mongodb_url
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                MONGODB_URI: Joi.string().required(),
                JWT_EXPIRATION: Joi.number().required(),
                JWT_SECRET: Joi.string().required(),
            }),
        }),
        // GraphQL setup
        GraphQLModule.forRoot<ApolloDriverConfig>({
            autoSchemaFile: true,
            driver: ApolloDriver,
        }),
        UsersModule,
        DatabaseModule,
        AuthModule,
        BookmarksModule,
        LinksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
