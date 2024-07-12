import { isObject, isEmptyObject, ID, Storage, ClientDBError } from "./utils.js";

export class ClientDB {
  static createdDatabases = {};

  /**
   * Creates a new instance of ClientDB.
   * @param {string} databaseName - The name of the database.
   * @throws {ClientDBError} If a database with the same name already exists.
   */
  constructor(databaseName) {
    const trimmedName = this._validateName(databaseName, "database");

    if (ClientDB.createdDatabases[trimmedName]) {
      throw new ClientDBError(`Database '${trimmedName}' already exists.`);
    }

    ClientDB.createdDatabases[trimmedName] = true;

    this.database = trimmedName;
    this.collections = Storage.get(this.database) || {};

    this._listCollectionMethods();
  }

  /**
   * Saves the current state of collections to the storage.
   * @private
   */
  _save() {
    Storage.set(this.database, this.collections);
  }

  /**
   * Validates and trims the name.
   * @param {string} name - The name to validate.
   * @param {string} type - The type of the name (e.g., 'database', 'collection').
   * @param {string} [status=null] - The status of the action (e.g., 'drop').
   * @returns {string} The trimmed name.
   * @throws {ClientDBError} If the name is invalid.
   * @private
   */
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

  /**
   * Lists methods for each collection in the database.
   * @private
   */
  _listCollectionMethods() {
    Object.keys(this.collections).forEach((key) => {
      const currentCollection = this.collections[key];

      const collectionMethods = {
        /**
         * Adds a new item to the collection.
         * @param {Object} data - The data to add.
         * @returns {Object} The result of the add operation.
         * @throws {ClientDBError} If the data is invalid.
         */
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
        /**
         * Updates an existing item in the collection.
         * @param {string} id - The ID of the item to update.
         * @param {Object} data - The new data for the item.
         * @returns {Object} The result of the update operation.
         * @throws {ClientDBError} If the data is invalid.
         */
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
            data: updatedData,
          };
        },
        /**
         * Deletes an item from the collection.
         * @param {string} id - The ID of the item to delete.
         * @returns {Object} The result of the delete operation.
         */
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
        /**
         * Lists items in the collection with optional filters, sorting, and pagination.
         * @param {Object} [options={}] - The options for listing items.
         * @param {string} [options.id] - The ID of a specific item to retrieve.
         * @param {Object} [options.filter] - The filter criteria.
         * @param {Object} [options.sort] - The sort criteria.
         * @param {Object} [options.search] - The search criteria.
         * @param {number} [options.limit] - The number of items per page.
         * @param {number} [options.page] - The page number to retrieve.
         * @returns {Array|Object} The list of items or a specific item if ID is provided.
         */
        list: (options = {}) => {
          const { id, filter, sort, search, limit, page } = options;

          let result = currentCollection;

          if (id) {
            const idx = result.findIndex((item) => item.$id === id);
            return result[idx];
          }

          if (filter) {
            result = items.filter((item) => {
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

          return result;
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

  /**
   * Creates a new collection in the database.
   * @param {string} collectionName - The name of the collection to create.
   */
  createCollection(collectionName) {
    const trimmedName = this._validateName(collectionName, "collection");

    if (!(trimmedName in this.collections)) {
      this.collections[trimmedName] = [];
      this._save();
      this._listCollectionMethods();
    }
  }

  /**
   * Drops a collection from the database.
   * @param {string} collectionName - The name of the collection to drop.
   * @throws {ClientDBError} If the collection name is invalid.
   */
  dropCollection(collectionName) {
    const trimmedName = this._validateName(collectionName, "collection", "drop");

    if (trimmedName) {
      delete this.collections[trimmedName];
      this._save();
      this._listCollectionMethods();
    }
  }

  /**
   * Drops the entire database.
   */
  dropDatabase() {
    delete ClientDB.createdDatabases[this.database];
    Storage.remove(this.database);
  }

  /**
   * Checks if a database exists.
   * @param {string} databaseName - The name of the database to check.
   * @returns {boolean} True if the database exists, false otherwise.
   */
  static databaseExists(databaseName) {
    const trimmedName = databaseName?.toString().trim();
    return !!ClientDB.createdDatabases[trimmedName];
  }

  /**
   * Checks if a collection exists in a specified database.
   * @param {string} databaseName - The name of the database.
   * @param {string} collectionName - The name of the collection.
   * @returns {boolean} True if the collection exists, false otherwise.
   */
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
