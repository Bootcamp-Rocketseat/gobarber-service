import { container } from 'tsyringe';

import DiskStorageProvider from '@shared/providers/Storage/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/providers/Storage/models/IStorageProvider';

import MailtrapEmailProvider from '@shared/providers/Email/implementations/MailtrapEmailProvider';
import IEmailProvider from '@shared/providers/Email/models/IEmailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IEmailProvider>(
  'EmailProvider',
  new MailtrapEmailProvider(),
);
