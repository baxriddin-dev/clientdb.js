class Storage {
  static set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  static get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }

  static removeAll() {
    window.localStorage.clear();
  }
}

class ID {
  static unique() {
    const timestamp = Date.now().toString(36);
    const randomStrStart = Math.random().toString(36).substring(2, 11);
    const randomStrEnd = Math.random().toString(36).substring(2, 11);

    return `${randomStrStart}-${timestamp}-${randomStrEnd}`;
  }
}

class ClientDBError extends Error {
  constructor(message) {
    super(message);
    this.name = "ClientDB Error";
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && value.constructor === Object;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

export { Storage, ID, ClientDBError, isObject, isEmptyObject };
