export default interface IEmailProvider {
  sendEmail(to: string, message: string): Promise<void>;
}
