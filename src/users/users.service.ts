import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserInput } from '../dto/input/create-user-input.dto';
import { GetUserArgs } from '../dto/args/get-user-args.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './models/user.schema';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}
    // CRUD Functions part
    async createUser(createUserData: CreateUserInput) {
        // Check unique email
        await this.validateCreateUserData(createUserData);
        // create a mongodb document with a hashed password
        const userDocument = await this.usersRepository.create({
            ...createUserData,
            password: await bcrypt.hash(createUserData.password, 10),
        });
        // return a model
        return this.toModel(userDocument);
    }

    async getUser(getUserArgs: GetUserArgs) {
        const userDocument = await this.usersRepository.findOne(getUserArgs);
        return this.toModel(userDocument);
    }
    // Utility functions part :
    //
    // Creation Validator for unique email
    private async validateCreateUserData(createUserData: CreateUserInput) {
        let found = true;
        try {
            await this.usersRepository.findOne({ email: createUserData.email });
        } catch (err) {
            found = false;
        }

        if (found) {
            throw new UnprocessableEntityException('Email already exists.');
        }
    }
    // Convert document to a model
    private toModel(userDocument: UserDocument): User {
        return {
            _id: userDocument._id.toHexString(),
            email: userDocument.email,
        };
    }
}
