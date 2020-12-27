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
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '12345',
    });

    expect(appointment.provider_id).toBe('12345');
    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create a new appointment with the same datetime', async () => {
    const appointmentDate = new Date();
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '12345',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
