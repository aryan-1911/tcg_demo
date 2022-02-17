class LocalStorage {
  setItem(key: string, data: any, storage: Storage = window.localStorage) {
    storage.setItem(
      key,
      typeof data === 'string' ? data : JSON.stringify(data),
    );
  }

  getItem(key: string, storage?: Storage) {
    return storage
      ? storage.getItem(key) || null
      : window.localStorage.getItem(key) || sessionStorage.getItem(key) || null;
  }

  getItemParsed<T>(key: string): T {
    return this.getItem(key) ? JSON.parse(this.getItem(key) || '') : null;
  }

  removeItem(key: string, storage?: Storage): void {
    if (storage) {
      storage.removeItem(key);
    } else {
      window.localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    }
  }
}

export const storageSvc = new LocalStorage();
