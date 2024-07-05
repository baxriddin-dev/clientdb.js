import { Storage } from "../utils/storage.js";

export class Database {
  constructor(databaseName) {
    const trimmedName = this._validateName(databaseName, "database");

    this.database = trimmedName;
    this.collections = Storage.get(this.database) || {};

    this._listCollectionMethods();
  }

  _save() {
    Storage.set(this.database, this.collections);
  }

  _validateName(name, type, status = null) {
    const trimmedName = name?.toString().trim();

    if (!trimmedName && status === "drop") {
      throw new Error(`You did not specify the name of the ${type} to delete.`);
    }

    if (!trimmedName) {
      throw new Error(`You did not name the ${type}!`);
    }

    return trimmedName;
  }

  _listCollectionMethods() {
    Object.keys(this.collections).forEach((key) => {
      const currentCollection = this.collections[key];

      this[key] = {
        add: (data) => {
          currentCollection.push(data);
          this._save();
        },
        update: (id, data) => {
          const idx = currentCollection.findIndex((item) => item.id === id);

          if (idx !== -1) {
            currentCollection[idx] = data;
            this._save();
          }
        },
        remove: (id) => {
          const idx = currentCollection.findIndex((item) => item.id === id);

          if (idx !== -1) {
            currentCollection.splice(idx, 1);
            this._save();
          }
        },
        list: () => {
          return currentCollection;
        },
      };
    });
  }

  createCollection(collectionName) {
    const trimmedName = this._validateName(collectionName, "collection");

    if (!(trimmedName in this.collections)) {
      this.collections[trimmedName] = [];
      this._save();

      this._listCollectionMethods();
      return [];
    } else {
      return this.collections[trimmedName];
    }
  }

  dropCollection(collectionName) {
    const trimmedName = this._validateName(collectionName, "collection", "drop");

    if (trimmedName) {
      delete this.collections[trimmedName];
      this._save();

      return true;
    } else {
      console.error(`Collection ${trimmedName} does not exist`);
      return false;
    }
  }

  dropDatabase() {
    Storage.remove(this.database);

    if (!Storage.get(this.database)) {
      return true;
    }

    return false;
  }
}
