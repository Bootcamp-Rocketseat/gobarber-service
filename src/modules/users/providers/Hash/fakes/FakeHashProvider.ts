import IHashProvider from '@modules/users/providers/Hash/models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generate(password: string): Promise<string> {
    return password;
  }

  public async compare(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return password === passwordHash;
  }
}
