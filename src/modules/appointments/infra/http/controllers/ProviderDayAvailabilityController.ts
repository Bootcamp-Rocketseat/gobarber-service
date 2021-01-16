import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const { provider_id } = request.params;

    const listAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );
    const appointment = await listAvailability.execute({
      provider_id,
      month,
      year,
      day,
    });

    return response.json(appointment);
  }
}
