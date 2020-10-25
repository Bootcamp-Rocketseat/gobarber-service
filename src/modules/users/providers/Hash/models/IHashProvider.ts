export default interface IHashProvider {
  generate(password: string): Promise<string>;
  compare(password: string, hash: string | undefined): Promise<boolean>;
}
