const storage = window.localStorage;

export class Storage {
  static set(key, value) {
    storage.setItem(key, JSON.stringify(value))
  }

  static get(key) {
    return JSON.parse(storage.getItem(key));
  }

  static remove(key) {
    storage.removeItem(key)
  }
}
