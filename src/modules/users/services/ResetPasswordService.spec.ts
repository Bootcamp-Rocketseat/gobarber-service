import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/FakeUserTokensRepository';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('resetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);
    const token = await fakeUserTokensRepository.generate(user.id);
    await resetPasswordService.execute({
      token: token.token,
      password: '999999',
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
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
});
