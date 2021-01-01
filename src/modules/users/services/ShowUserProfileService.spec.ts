import AppError from '@shared/errors/AppError';

import ShowUserProfileService from './ShowUserProfileService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let showUserProfileService: ShowUserProfileService;

describe('showUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showUserProfileService = new ShowUserProfileService(fakeUsersRepository);
  });

  it('Should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);

    const response = await showUserProfileService.execute({ user_id: user.id });

    expect(response.name).toBe(fakeUserInfo.name);
    expect(response.email).toBe(fakeUserInfo.email);
  });

  it('Should not be able to show an inexistent user', async () => {
    await expect(
      showUserProfileService.execute({ user_id: 'inexistent-user-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
