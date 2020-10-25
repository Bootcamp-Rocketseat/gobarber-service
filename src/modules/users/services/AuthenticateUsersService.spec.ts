import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/Hash/fakes/FakeHashProvider';

import AuthenticateUsersService from './AuthenticateUsersService';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

describe('AuthenticateUser', () => {
  it('Should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute(fakeUserInfo);
    expect(user).toHaveProperty('id');

    const authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const response = await authenticateUsersService.execute({
      email: fakeUserInfo.email,
      password: fakeUserInfo.password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with inexistent user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUsersService.execute({
        email: fakeUserInfo.email,
        password: fakeUserInfo.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUserService.execute(fakeUserInfo);
    expect(user).toHaveProperty('id');

    const authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUsersService.execute({
        email: fakeUserInfo.email,
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
