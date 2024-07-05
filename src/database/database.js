import { ID } from "../utils/id.js";
import { Storage } from "../utils/storage.js";
import { isObject, isEmptyObject } from "../utils/utils.js";

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

      const collectionMethods = {
        add: (data) => {
          if (data === undefined) return;

          if (!isObject(data)) {
            throw new Error("The data must be of type object");
          }

          if (isEmptyObject(data)) {
            throw new Error("Data must not be empty");
          }

          currentCollection.push({
            $id: ID.unique(),
            $createdAt: Date.now(),
            $updatedAt: Date.now(),
            ...data,
          });
          this._save();
        },
        update: (id, data) => {
          if (!isObject(data)) {
            throw new Error("The data must be of type object");
          }

          const idx = currentCollection.findIndex((item) => item.id === id);

          if (idx !== -1) {
            const originalData = currentCollection[idx];
            currentCollection[idx] = {
              ...originalData,
              ...data,
              $id: originalData.$id,
              $createdAt: originalData.$createdAt,
              $updatedAt: Date.now(),
            };
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
        list: (id) => {
          return currentCollection;
        },
      };

      if (!Object.prototype.hasOwnProperty.call(this, key)) {
        Object.defineProperty(this, key, {
          get: () => collectionMethods,
          enumerable: false,
        });
      }
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
