import AppError from '@shared/errors/AppError';
import SendEmailPasswordForgotService from './SendEmailPasswordForgotService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/FakeUserTokensRepository';

import FakeEmailProvider from '../../../shared/providers/Email/fakes/FakeEmailProvider';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeEmailProvider: FakeEmailProvider;
let sendEmailPasswordForgotService: SendEmailPasswordForgotService;

describe('SendEmailPasswordForgot', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeEmailProvider = new FakeEmailProvider();

    sendEmailPasswordForgotService = new SendEmailPasswordForgotService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeEmailProvider,
    );
  });

  it('Should be able to send an email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');

    await fakeUsersRepository.create(fakeUserInfo);
    await sendEmailPasswordForgotService.execute({ email: fakeUserInfo.email });

    expect(sendEmail).toHaveBeenCalledWith(
      fakeUserInfo.email,
      'Você solicitou o reset da sua senha',
    );
  });

  it('Should not be able to send an email to a no existent user', async () => {
    await expect(
      sendEmailPasswordForgotService.execute({ email: fakeUserInfo.email }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to generate a token when send email', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create(fakeUserInfo);
    await sendEmailPasswordForgotService.execute({ email: fakeUserInfo.email });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
