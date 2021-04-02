
export class StorageHelper {

  static checkStorage(name: string): boolean {
    return (localStorage.getItem(name) !== null);
  }

  static toInt(name: string): number {
    return Number(name);
  }

  static initStorage(name: string, init: number): number {
    if (StorageHelper.checkStorage(name)) {
      const getItem = localStorage.getItem(name);
      return StorageHelper.toInt(getItem);
    } else {
      localStorage.setItem(name, String(init));
      return init;
    }
  }
}
