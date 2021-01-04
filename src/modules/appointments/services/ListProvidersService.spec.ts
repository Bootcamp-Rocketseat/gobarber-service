import ListProvidersService from './ListProvidersService';

import FakeUsersRepository from '../../users/repositories/FakeUsersRepository';

const fakeUserInfo = {
  email: 'test@gobarber.com',
  name: 'teste gobarber',
  password: '12345678',
};

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('Should be able to list providers', async () => {
    await fakeUsersRepository.create({
      name: 'first',
      email: 'first@gobarber.com',
      password: '123456789',
    });
    const user = await fakeUsersRepository.create(fakeUserInfo);

    const providersList = await listProvidersService.execute({
      user_id: user.id,
    });

    expect(providersList.length).toBe(1);
    expect(providersList[0].name).toBe('first');
    expect(providersList[0].email).toBe('first@gobarber.com');
  });
});
