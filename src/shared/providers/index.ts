import { container } from 'tsyringe';

import DiskStorageProvider from '@shared/providers/Storage/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/providers/Storage/models/IStorageProvider';

import MailtrapEmailProvider from '@shared/providers/Email/implementations/MailtrapEmailProvider';
import IEmailProvider from '@shared/providers/Email/models/IEmailProvider';

import HandlebarsEmailTemplateProvider from '@shared/providers/EmailTemplate/implementations/HandlebarsEmailTemplateProvider';
import IEmailTemplateProvider from '@shared/providers/EmailTemplate/models/IEmailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IEmailTemplateProvider>(
  'EmailTemplateProvider',
  HandlebarsEmailTemplateProvider,
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  container.resolve(MailtrapEmailProvider),
);
