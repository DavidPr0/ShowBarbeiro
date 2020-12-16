import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import UploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import User from '../models/User';


interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise <User> {
        const usersRepositry = getRepository(User);

        const user = await usersRepositry.findOne(user_id);

        if (!user) {
            throw new AppError("Only authenticated users can chance avatar.", 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }

        }

        user.avatar = avatarFilename;

        await usersRepositry.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;