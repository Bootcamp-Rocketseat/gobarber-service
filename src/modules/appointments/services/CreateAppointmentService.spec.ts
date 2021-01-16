import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '99999',
      provider_id: '12345',
    });

    expect(appointment.provider_id).toBe('12345');
    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create a new appointment with the same datetime', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointmentDate = new Date(2020, 4, 10, 14);
    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: '99999',
      provider_id: '12345',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        user_id: '99999',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '99999',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment to yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '12345',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create a new appointment before 8AM and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: '99999',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: '99999',
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
