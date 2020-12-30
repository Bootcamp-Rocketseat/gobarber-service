import AppError from '@shared/errors/AppError';

import UpdateUserProfileService from './UpdateUserProfileService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeHashProvider from '../providers/Hash/fakes/FakeHashProvider';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);

    const response = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@gobarber.com',
    });

    expect(response.name).toBe('Jane Doe');
    expect(response.email).toBe('janedoe@gobarber.com');
  });

  it('Should not be able to update an inexistent user', async () => {
    await expect(
      updateUserProfileService.execute({
        user_id: 'inexistent-user-id',
        name: 'Jane Doe',
        email: 'janedoe@gobarber.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update to an existent email', async () => {
    await fakeUsersRepository.create({
      name: 'test-existent',
      email: 'test_existent@gobarber.com',
      password: 'test',
    });

    const user = await fakeUsersRepository.create(fakeUserInfo);

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'test_existent@gobarber.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update user password', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);

    const response = await updateUserProfileService.execute({
      user_id: user.id,
      name: 'Jane Doe',
      email: 'janedoe@gobarber.com',
      password: '999999',
      old_password: '12345678',
    });

    expect(response.password).toBe('999999');
  });

  it('Should not be able to update user password with wrong old password', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'janedoe@gobarber.com',
        password: '999999',
        old_password: '888888888888888',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update user password without old password', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);

    await expect(
      updateUserProfileService.execute({
        user_id: user.id,
        name: 'Jane Doe',
        email: 'janedoe@gobarber.com',
        password: '999999',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
