import ISendEmailDTO from '@shared/providers/Email/dtos/ISendEmailDTO';
import IEmailProvider from '../models/IEmailProvider';

export default class FakeEmailProvider implements IEmailProvider {
  private emails: ISendEmailDTO[] = [];

  public async sendEmail(message: ISendEmailDTO): Promise<void> {
    this.emails.push(message);
  }
}
