import IEmailProvider from '../models/IEmailProvider';

export default class FakeEmailProvider implements IEmailProvider {
  private emails: object[] = [];

  public async sendEmail(to: string, message: string): Promise<void> {
    this.emails.push({
      to,
      message,
    });
  }
}
