import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const transformedDate = startOfHour(date);
    const hasAppointmentInTheDate = this.appointmentsRepository.findByDate(
      transformedDate,
    );

    if (hasAppointmentInTheDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: transformedDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
