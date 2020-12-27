import AppError from '@shared/errors/AppError';

import UpdateUserAvatarService from './UpdateUserAvatarService';

import FakeUsersRepository from '../repositories/FakeUsersRepository';
import FakeStorageProvider from '../../../shared/providers/Storage/fakes/FakeStorageProvider';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('Should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create(fakeUserInfo);

    const response = await updateUserAvatarService.execute({
      filename: 'new file',
      user_id: user.id,
    });

    expect(response.avatar).toBe('new file');
  });

  it('Should not be able to update user avatar when the user not exist', async () => {
    expect(
      updateUserAvatarService.execute({
        filename: 'new file',
        user_id: 'fake_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update user avatar when user avatar already exist', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const user = await fakeUsersRepository.create(fakeUserInfo);

    await updateUserAvatarService.execute({
      filename: 'file.jpg',
      user_id: user.id,
    });

    const response = await updateUserAvatarService.execute({
      filename: 'newFile.jpg',
      user_id: user.id,
    });

    expect(deleteFile).toHaveBeenCalledWith('file.jpg');
    expect(response.avatar).toBe('newFile.jpg');
  });
});
