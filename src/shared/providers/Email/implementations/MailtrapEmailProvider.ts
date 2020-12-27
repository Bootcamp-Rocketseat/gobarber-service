import { createTransport, Transporter } from 'nodemailer';
import ISendEmailDTO from '@shared/providers/Email/dtos/ISendEmailDTO';
import IEmailTemplateProvider from '@shared/providers/EmailTemplate/models/IEmailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import IEmailProvider from '../models/IEmailProvider';

import MailtrapConfig from '../../../../config/mailtrap';

@injectable()
export default class MailtrapMailProvider implements IEmailProvider {
  private transporter: Transporter;

  constructor(
    @inject('EmailTemplateProvider')
    private emailTemplateProvider: IEmailTemplateProvider,
  ) {
    this.transporter = createTransport(MailtrapConfig);
  }

  public async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    this.transporter.sendMail({
      from: {
        name: from?.name || 'Equipe Gobarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.emailTemplateProvider.parse(templateData),
    });
  }
}
