import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendEmailPasswordForgotService from '@modules/users/services/SendEmailPasswordForgotService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailPasswordForgot = container.resolve(
      SendEmailPasswordForgotService,
    );

    await sendEmailPasswordForgot.execute({
      email,
    });

    return response.status(204).json();
  }
}
