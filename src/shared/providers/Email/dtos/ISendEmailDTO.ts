import IParseEmailTemplateDTO from '@shared/providers/EmailTemplate/dtos/IParseEmailTemplateDTO';

interface ISendEmailContact {
  name: string;
  email: string;
}

export default interface ISendEmailDTO {
  to: ISendEmailContact;
  from?: ISendEmailContact;
  subject: string;
  templateData: IParseEmailTemplateDTO;
}
