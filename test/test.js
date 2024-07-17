// Basic functionality testing.
// To run it, open index.html in a browser

import { ClientDB } from "../src/index.js";

function assert(condition, message) {
  if (!condition) {
    console.error("Test failed: " + message);
  } else {
    console.log("Test passed: " + message);
  }
}

function runTests() {
  console.log("Running tests...");

  window.localStorage.clear();
  let db;

  try {
    db = new ClientDB("TestDB");
    assert(db.database === "TestDB", "Database creation");
  } catch (e) {
    assert(false, "Database creation failed with error: " + e.message);
  }

  try {
    db.createCollection("users");
    assert(ClientDB.collectionExists("TestDB", "users"), "Collection creation");
  } catch (e) {
    assert(false, "Collection creation failed with error: " + e.message);
  }

  try {
    const result = db.users.add({ name: "John", age: 30 });
    assert(result.success, "Add item to collection");
  } catch (e) {
    assert(false, "Add item to collection failed with error: " + e.message);
  }

  try {
    const addedItem = db.users.list()[0];
    const result = db.users.update(addedItem.$id, { age: 31 });
    assert(result.success, "Update item in collection");
  } catch (e) {
    assert(false, "Update item in collection failed with error: " + e.message);
  }

  try {
    const addedItem = db.users.list()[0];
    const result = db.users.delete(addedItem.$id);
    assert(result.success, "Delete item from collection");
  } catch (e) {
    assert(false, "Delete item from collection failed with error: " + e.message);
  }

  try {
    db.dropCollection("users");
    assert(!ClientDB.collectionExists("TestDB", "users"), "Collection deletion");
  } catch (e) {
    assert(false, "Collection deletion failed with error: " + e.message);
  }

  try {
    db.dropDatabase();
    assert(!ClientDB.databaseExists("TestDB"), "Database deletion");
  } catch (e) {
    assert(false, "Database deletion failed with error: " + e.message);
  }

  console.log("Tests completed.");
}

runTests();
