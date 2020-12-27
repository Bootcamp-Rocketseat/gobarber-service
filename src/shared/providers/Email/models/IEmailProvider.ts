import ISendEmailDTO from '@shared/providers/Email/dtos/ISendEmailDTO';

export default interface IEmailProvider {
  sendEmail(data: ISendEmailDTO): Promise<void>;
}
