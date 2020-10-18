import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const transformedDate = startOfHour(date);
    const hasAppointmentInTheDate = await this.appointmentsRepository.findByDate(
      transformedDate,
    );

    if (hasAppointmentInTheDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider_id,
      date: transformedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
