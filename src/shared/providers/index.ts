import { container } from 'tsyringe';

import DiskStorageProvider from '@shared/providers/Storage/implementations/DiskStorageProvider';
import IStorageProvider from '@shared/providers/Storage/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
