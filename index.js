class StorageHelper {
  constructor(namespace) {
    this.namespace = namespace || "app";
  }

  _getFullKey(key) {
    return `${this.namespace}:${key}`;
  }

  setItem(key, value) {
    const fullKey = this._getFullKey(key);
    const stringValue = JSON.stringify(value);
    localStorage.setItem(fullKey, stringValue);
  }

  getItem(key) {
    const fullKey = this._getFullKey(key);
    const stringValue = localStorage.getItem(fullKey);
    return JSON.parse(stringValue);
  }

  removeItem(key) {
    const fullKey = this._getFullKey(key);
    localStorage.removeItem(fullKey);
  }

  clear() {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(`${this.namespace}:`)) {
        localStorage.removeItem(key);
      }
    });
  }
}