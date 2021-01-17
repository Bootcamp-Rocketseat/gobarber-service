import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the appointments of the provider', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '99999',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '99999',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const providerDayAvailability = await listProviderAppointmentsService.execute(
      {
        provider_id: 'user',
        month: 5,
        year: 2020,
        day: 20,
      },
    );

    expect(providerDayAvailability).toEqual([appointment1, appointment2]);
  });
});
