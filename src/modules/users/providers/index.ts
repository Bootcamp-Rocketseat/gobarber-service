import { container } from 'tsyringe';

import BCryptHashProvider from '@modules/users/providers/Hash/implementations/BCryptHashProvider';
import IHashProvider from '@modules/users/providers/Hash/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
