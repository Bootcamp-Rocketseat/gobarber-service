import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/providers/Cache/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/Hash/fakes/FakeHashProvider';

import AuthenticateUsersService from './AuthenticateUsersService';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;

let createUserService: CreateUserService;
let authenticateUsersService: AuthenticateUsersService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    authenticateUsersService = new AuthenticateUsersService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to authenticate', async () => {
    const user = await createUserService.execute(fakeUserInfo);
    expect(user).toHaveProperty('id');

    const response = await authenticateUsersService.execute({
      email: fakeUserInfo.email,
      password: fakeUserInfo.password,
    });

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
    expect(response.user).toEqual(user);
  });

  it('Should not be able to authenticate with inexistent user', async () => {
    expect(
      authenticateUsersService.execute({
        email: fakeUserInfo.email,
        password: fakeUserInfo.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    const user = await createUserService.execute(fakeUserInfo);
    expect(user).toHaveProperty('id');

    expect(
      authenticateUsersService.execute({
        email: fakeUserInfo.email,
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
