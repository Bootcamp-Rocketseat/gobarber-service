import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/providers/Cache/models/ICacheProvider';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const transformedDate = startOfHour(date);

    if (isBefore(transformedDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment for yourself");
    }

    if (getHours(transformedDate) < 8 || getHours(transformedDate) > 17) {
      throw new AppError(
        'You can only create appountments between 8am and 5pm',
      );
    }

    const hasAppointmentInTheDate = await this.appointmentsRepository.findByDate(
      transformedDate,
    );
    if (hasAppointmentInTheDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: transformedDate,
    });

    const dateFormatted = format(transformedDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para ${dateFormatted}`,
    });

    const cacheKey = `provider-appointments:${provider_id}:${format(
      transformedDate,
      'yyyy-M-d',
    )}`;

    await this.cacheProvider.invalidate(cacheKey);

    return appointment;
  }
}

export default CreateAppointmentService;
