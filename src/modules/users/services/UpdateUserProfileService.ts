import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/Hash/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateUserProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExist = await this.usersRepository.findByEmail(email);

    if (emailExist && emailExist.id !== user_id) {
      throw new AppError('E-mail already in use');
    }

    if (password && !old_password) {
      throw new AppError('Old password not informed.');
    }

    if (password && old_password) {
      const isEqualPassword = await this.hashProvider.compare(
        old_password,
        user.password,
      );

      if (!isEqualPassword) {
        throw new AppError('Old password verify failed.');
      }

      user.password = await this.hashProvider.generate(password);
    }

    user.name = name;
    user.email = email;

    return this.usersRepository.save(user);
  }
}

export default UpdateUserProfileService;
