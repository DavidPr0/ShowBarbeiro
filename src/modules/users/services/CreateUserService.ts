import { hash } from 'bcryptjs';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError("Endereço de e-mail já está sendo usado.");
        }

        const hashedPassword = await hash(password, 8);

        const user = await this.usersRepository.create({
           name,
           email,
           password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
