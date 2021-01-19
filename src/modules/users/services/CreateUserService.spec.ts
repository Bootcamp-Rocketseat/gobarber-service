import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/providers/Cache/fakes/FakeCacheProvider';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/Hash/fakes/FakeHashProvider';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute(fakeUserInfo);
    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with the same email', async () => {
    await createUserService.execute(fakeUserInfo);

    expect(createUserService.execute(fakeUserInfo)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
