import { isObject, isEmptyObject, ID, Storage, ClientDBError } from "./utils.js";

export class ClientDB {
  static createdDatabases = {};
  static instances = {};

  constructor(databaseName) {
    const trimmedName = this._validateName(databaseName, "database");

    if (ClientDB.instances[trimmedName]) {
      return ClientDB.instances[trimmedName];
    }

    ClientDB.createdDatabases[trimmedName] = true;
    ClientDB.instances[trimmedName] = this;

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
      throw new ClientDBError(`You did not specify the name of the ${type} to delete.`);
    }

    if (!trimmedName) {
      throw new ClientDBError(`You did not name the ${type}!`);
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
            throw new ClientDBError("The data must be of type object");
          }

          if (isEmptyObject(data)) {
            throw new ClientDBError("Data must not be empty");
          }

          const newData = {
            ...data,
            $id: ID.unique(),
            $createdAt: Date.now(),
            $updatedAt: Date.now(),
          };

          currentCollection.push(newData);
          this._save();

          return {
            success: true,
            message: "Item added successfully",
            data: newData,
          };
        },
        update: (id, data) => {
          if (data === undefined) return;

          if (!isObject(data)) {
            throw new ClientDBError("The data must be of type object");
          }

          const idx = currentCollection.findIndex((item) => item.$id === id);

          if (idx === -1) {
            return {
              success: false,
              message: `No item found with id ${id}`,
            };
          }

          const originalData = currentCollection[idx];

          const updatedData = {
            ...originalData,
            ...data,
            $id: originalData.$id,
            $createdAt: originalData.$createdAt,
            $updatedAt: Date.now(),
          };

          currentCollection[idx] = updatedData;
          this._save();

          return {
            success: true,
            message: "Item updated successfully",
            data: { ...updatedData },
          };
        },
        delete: (id) => {
          const idx = currentCollection.findIndex((item) => item.$id === id);

          if (idx !== -1) {
            currentCollection.splice(idx, 1);
            this._save();
            return { success: true, message: "Item deleted successfully." };
          } else {
            return { success: false, message: "No information available for this id." };
          }
        },
        list: (options = {}) => {
          const { id, filter, sort, search, limit, page } = options;

          let result = currentCollection;

          if (id) {
            const idx = result.findIndex((item) => item.$id === id);
            return result[idx];
          }

          if (filter) {
            result = result.filter((item) => {
              return Object.keys(filter).every((key) => {
                if (typeof filter[key] === "function") {
                  return filter[key](item[key]);
                } else {
                  return item[key] == filter[key];
                }
              });
            });
          }

          if (search) {
            result = result.filter((item) => {
              return Object.keys(search).some((key) => {
                let itemValue = item[key] !== null && item[key] !== undefined ? String(item[key]).toLowerCase() : "";
                let searchValue =
                  search[key] !== null && search[key] !== undefined ? String(search[key]).toLowerCase() : "";
                return itemValue.includes(searchValue);
              });
            });
          }

          if (sort) {
            result = result.sort((a, b) => {
              for (let key in sort) {
                if (a[key] > b[key]) return sort[key] === "asc" ? 1 : -1;
                if (a[key] < b[key]) return sort[key] === "asc" ? -1 : 1;
              }
              return 0;
            });
          }

          if (limit !== undefined && page !== undefined) {
            const start = (page - 1) * limit;
            const end = page * limit;
            result = result.slice(start, end);
          }

          return [...result];
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
    if (!this.collections) {
      this.collections = {};
    }

    const trimmedName = this._validateName(collectionName, "collection");

    if (!(trimmedName in this.collections)) {
      this.collections[trimmedName] = [];
      this._save();
      this._listCollectionMethods();
    }
  }

  dropCollection(collectionName) {
    const trimmedName = this._validateName(collectionName, "collection", "drop");

    if (trimmedName) {
      delete this.collections[trimmedName];
      this._save();
      this._listCollectionMethods();
    }
  }

  dropDatabase() {
    delete ClientDB.createdDatabases[this.database];
    Storage.remove(this.database);
  }

  importData(data) {
    if (!isObject(data)) {
      throw new ClientDBError("The data must be of type object");
    }

    Object.keys(data).forEach((collectionName) => {
      const trimmedName = this._validateName(collectionName, "collection");
      if (!this.collections[trimmedName]) {
        this.collections[trimmedName] = [];
      }

      data[trimmedName].forEach((item) => {
        if (isObject(item) && !isEmptyObject(item)) {
          const newData = {
            ...item,
            $id: item.$id || ID.unique(),
            $createdAt: item.$createdAt || Date.now(),
            $updatedAt: item.$updatedAt || Date.now(),
          };
          this.collections[trimmedName].push(newData);
        }
      });
    });

    this._save();
    this._listCollectionMethods();
  }

  static databaseExists(databaseName) {
    const trimmedName = databaseName?.toString().trim();
    return !!ClientDB.createdDatabases[trimmedName];
  }

  static collectionExists(databaseName, collectionName) {
    const trimmedDatabaseName = databaseName?.toString().trim();
    const trimmedCollectionName = collectionName?.toString().trim();

    if (!ClientDB.createdDatabases[trimmedDatabaseName]) {
      return false;
    }

    const collections = Storage.get(trimmedDatabaseName) || {};
    return trimmedCollectionName in collections;
  }
}
