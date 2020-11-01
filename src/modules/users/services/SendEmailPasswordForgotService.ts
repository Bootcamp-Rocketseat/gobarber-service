import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import IEmailProvider from '@shared/providers/Email/models/IEmailProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendEmailPasswordForgotService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('EmailProvider')
    private emailProvider: IEmailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(`User with the email ${email} not exist`);
    }

    await this.userTokensRepository.generate(user.id);

    await this.emailProvider.sendEmail(
      email,
      'Você solicitou o reset da sua senha',
    );
  }
}

export default SendEmailPasswordForgotService;
