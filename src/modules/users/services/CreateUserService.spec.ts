import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/Hash/fakes/FakeHashProvider';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

describe('CreateUser', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute(fakeUserInfo);

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUserService.execute(fakeUserInfo);

    expect(createUserService.execute(fakeUserInfo)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
