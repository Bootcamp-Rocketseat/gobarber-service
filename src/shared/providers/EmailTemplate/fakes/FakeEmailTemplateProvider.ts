import IEmailTemplateProvider from '../models/IEmailTemplateProvider';

class FakeEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Email Content';
  }
}

export default FakeEmailTemplateProvider;
