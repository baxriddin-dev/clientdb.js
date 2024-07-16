/**
 * Interface for collection methods in ClientDB.
 */
interface CollectionMethods {
  /**
   * Adds a new item to the collection.
   * @param data - The data to add.
   * @returns The result of the add operation.
   */
  add(data: Record<string, any>): { success: boolean; message: string; data: Record<string, any> };
  
  /**
   * Updates an existing item in the collection.
   * @param id - The ID of the item to update.
   * @param data - The new data for the item.
   * @returns The result of the update operation.
   */
  update(id: string, data: Record<string, any>): { success: boolean; message: string; data?: Record<string, any> };
  
  /**
   * Deletes an item from the collection.
   * @param id - The ID of the item to delete.
   * @returns The result of the delete operation.
   */
  delete(id: string): { success: boolean; message: string };
  
  /**
   * Lists items in the collection with optional filters, sorting, and pagination.
   * @param options - The options for listing items.
   * @returns The list of items or a specific item if ID is provided.
   */
  list(options?: {
    id?: string;
    filter?: Record<string, any>;
    sort?: Record<string, 'asc' | 'desc'>;
    search?: Record<string, any>;
    limit?: number;
    page?: number;
  }): Record<string, any>[] | Record<string, any>;
}

/**
 * A class representing a client-side database.
 */
export declare class ClientDB {
  /**
   * A record of created databases.
   */
  static createdDatabases: Record<string, boolean>;

  /**
   * Constructs a new ClientDB instance.
   * @param databaseName - The name of the database.
   * @throws {ClientDBError} If a database with the same name already exists.
   */
  constructor(databaseName: string);

  /**
   * Saves the current state of collections to the storage.
   * @private
   */
  private _save(): void;
  
  /**
   * Validates and trims the name.
   * @param name - The name to validate.
   * @param type - The type of the name (e.g., 'database', 'collection').
   * @param status - The status of the action (e.g., 'drop').
   * @returns The trimmed name.
   * @throws {ClientDBError} If the name is invalid.
   * @private
   */
  private _validateName(name: string, type: string, status?: string | null): string;
  
  /**
   * Lists methods for each collection in the database.
   * @private
   */
  private _listCollectionMethods(): void;

  /**
   * The name of the database.
   */
  database: string;

  /**
   * The collections in the database.
   */
  collections: Record<string, any[]>;

  /**
   * Creates a new collection in the database.
   * @param collectionName - The name of the collection to create.
   */
  createCollection(collectionName: string): void;
  
  /**
   * Drops a collection from the database.
   * @param collectionName - The name of the collection to drop.
   * @throws {ClientDBError} If the collection name is invalid.
   */
  dropCollection(collectionName: string): void;
  
  /**
   * Drops the entire database.
   */
  dropDatabase(): void;

  /**
   * Checks if a database exists.
   * @param databaseName - The name of the database to check.
   * @returns True if the database exists, false otherwise.
   */
  static databaseExists(databaseName: string): boolean;
  
  /**
   * Checks if a collection exists in a specified database.
   * @param databaseName - The name of the database.
   * @param collectionName - The name of the collection.
   * @returns True if the collection exists, false otherwise.
   */
  static collectionExists(databaseName: string, collectionName: string): boolean;

  [collectionName: string]: CollectionMethods | any;
}
