import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(filename: string): Promise<string> {
    this.storage.push(filename);
    return filename;
  }

  public async deleteFile(filename: string): Promise<void> {
    const fileIndex = this.storage.findIndex(file => file === filename);
    this.storage.splice(fileIndex, 1);
  }
}
