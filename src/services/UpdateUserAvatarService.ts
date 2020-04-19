import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import User from '../models/User';
import uploadConfig from '../config/upload';

interface Request {
  avatar_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute({ avatar_id, filename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(avatar_id);

    if (!user) {
      throw new Error('User not found for the provided id');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;

    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
