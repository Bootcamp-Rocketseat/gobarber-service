import { hash, compare } from 'bcryptjs';

import IHashProvider from '@modules/users/providers/Hash/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async generate(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8);
    return hashedPassword;
  }

  public async compare(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    const passwordMatched = await compare(password, passwordHash);
    return passwordMatched;
  }
}
