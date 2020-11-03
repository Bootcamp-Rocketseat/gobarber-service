import { createTransport, Transporter } from 'nodemailer';
import IEmailProvider from '../models/IEmailProvider';

import MailtrapConfig from '../../../../config/mailtrap';

export default class MailtrapMailProvider implements IEmailProvider {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport(MailtrapConfig);
  }

  public async sendEmail(to: string, message: string): Promise<void> {
    this.transporter.sendMail({
      from: 'equipe@gobarber.com.br',
      to,
      subject: 'Recuperação de senha',
      text: message,
    });
  }
}
