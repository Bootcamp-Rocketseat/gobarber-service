import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const existUser = await this.usersRepository.findByEmail(email);

    if (existUser) {
      throw new AppError(`User with the email ${email} already exist`);
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
