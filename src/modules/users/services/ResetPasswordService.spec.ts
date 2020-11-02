import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/FakeUserTokensRepository';
import FakeHashProvider from '../providers/Hash/fakes/FakeHashProvider';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('resetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);
    const token = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generate');

    await resetPasswordService.execute({
      token: token.token,
      password: '999999',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toBeCalledWith('999999');
    expect(updatedUser?.password).toBe('999999');
  });

  it('Should not be able to reset the password when token not exists', async () => {
    expect(
      resetPasswordService.execute({
        token: '1234',
        password: '999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password when user not exists', async () => {
    const token = await fakeUserTokensRepository.generate('123');

    await expect(
      resetPasswordService.execute({
        token: token.token,
        password: '999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset the password when the token has expired', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);
    const token = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token: token.token,
        password: '999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
