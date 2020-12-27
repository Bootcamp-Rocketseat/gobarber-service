import handlebars from 'handlebars';

import IEmailTemplateProvider from '../models/IEmailTemplateProvider';
import IParseEmailTemplateDTO from '../dtos/IParseEmailTemplateDTO';

class HandlebarsEmailTemplateProvider implements IEmailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseEmailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsEmailTemplateProvider;
