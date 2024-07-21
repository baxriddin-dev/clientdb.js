<p align="center">
  <img src="./preview.png" alt="WatermelonDB" width="539" />
</p>

<h4 align="center">
  A quick and simple instrument
</h4>

<p align="center">
  Test frontend applications easily and quickly with our simple and fast database working with localStorage. Perfect for developers who need to create a portfolio or test ideas without requiring knowledge of databases or backend.⚡️
</p>

<div align="center" class="links">
  <a href="https://github.com/baxriddin-dev/clientdb.js/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License"/>
  </a>

  <a href="https://www.npmjs.com/package/@baxriddin-dev/clientdb">
    <img src="https://img.shields.io/npm/v/%40baxriddin-dev%2Fclientdb?logoColor=orange&color=green" alt="npm"/>
  </a>
</div>

# Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Importing the Library](#importing-the-library)
  - [Creating a Database](#creating-a-database)
  - [Creating a Collection](#creating-a-collection)
  - [Adding Data to a Collection](#adding-data-to-a-collection)
  - [Updating Data in a Collection](#updating-data-in-a-collection)
  - [Deleting Data from a Collection](#deleting-data-from-a-collection)
  - [Listing Data in a Collection](#listing-data-in-a-collection)
- [Methods](#methods)
  - [Constructor](#constructor)
    - [`new ClientDB(databaseName)`](#new-clientdbdatabasename)
  - [Instance Methods](#instance-methods)
    - [`createCollection(collectionName)`](#createcollectioncollectionname)
    - [`dropCollection(collectionName)`](#dropcollectioncollectionname)
    - [`dropDatabase()`](#dropdatabase)
    - [`importData(data)`](#importdatadata)
  - [Collection Methods](#collection-methods)
    - [`add(data)`](#adddata)
    - [`update(id, data)`](#updateid-data)
    - [`delete(id)`](#deleteid)
    - [`list(options)`](#listoptions)
  - [Static Methods](#static-methods)
    - [`ClientDB.databaseExists(databaseName)`](#clientdbdatabaseexistsdatabasename)
    - [`ClientDB.collectionExists(databaseName, collectionName)`](#clientdbcollectionexistsdatabasename-collectionname)
- [Example: Advanced TODO App](#example-advanced-todo-app)
  - [Steps to Set Up a Project with Vite](#steps-to-set-up-a-project-with-vite)
    - [Setting up `index.html`](#setting-up-indexhtml)
    - [Setting up `main.js`](#setting-up-mainjs)
    - [Launch of the project](#launch-of-the-project)
- [Author and License](#author-and-license)
  - [Author](#author)
  - [License](#license)


# Installation

To install the library, use npm:
```bash
npm install @baxriddin-dev/clientdb

# (or with npm:)
yarn add @baxriddin-dev/clientdb
```

you can also use cdn:
```js
<script src="https://cdn.jsdelivr.net/npm/@baxriddin-dev/clientdb@1.1.1/src/clientdb.min.js"></script>
```

# Usage

Below is a detailed explanation of the ClientDB class and its methods.

## Importing the Library
```js
import { ClientDB } from "@baxriddin-dev/clientdb";

// If you use cdn, you don't need to import the class, 
// just place the cdn link at the top of all your js files

// Note: As the name suggests, ClientDB can only work on 
// the client side, if you want to use import, export syntax,
// you should use bundler like Vite or Webpack. 
// In other cases you can use cdn.
```

## Creating a Database

```js
const db = new ClientDB("myDatabase");
```

## Creating a Collection

```js
db.createCollection("products");
```

## Adding Data to a Collection

```js
db.products.add({ productName: "Apple", price: 18, categories: ['fruits', 'diet'] });
```

## Updating Data in a Collection

```js
const productID = "some-product-id"; // The ID of the todo item to update
db.products.update(productID, { price: 15 });
```

## Deleting Data from a Collection

```js
db.products.delete(productID);
```

## Listing Data in a Collection

```js
const allProducts = db.productID.list();
```

# Methods

Here is a brief classification of methods. For detailed information on how to use them, please refer to the code in the example projects. The index.d.ts file contains the types for all methods, which will also be helpful. To gain a better understanding, it is recommended to write and test the code yourself.

## Constructor

### `new ClientDB(databaseName)`
Creates a new instance of the `ClientDB` class.

- `databaseName` (string): The name of the database.

## Instance Methods

### `createCollection(collectionName)`
Creates a new collection in the database.

- `collectionName` (string): The name of the collection to create.

### `dropCollection(collectionName)`
Drops a collection from the database.

- `collectionName` (string): The name of the collection to drop.

### `dropDatabase()`
Drops the entire database.

### `importData(data)`
Imports data into the database.

- `data` (object): The data to import.

## Collection Methods

Each collection has the following methods available:

### `add(data)`
Adds a new item to the collection.

- `data` (object): The data to add.

### `update(id, data)`
Updates an existing item in the collection.

- `id` (string): The ID of the item to update.
- `data` (object): The new data for the item.

### `delete(id)`
Deletes an item from the collection.

- `id` (string): The ID of the item to delete.

### `list(options)`
Lists items in the collection.

- `options` (object): Optional parameters for filtering, sorting, searching, limiting, and paginating the results.

## Static Methods

### `ClientDB.databaseExists(databaseName)`
Checks if a database exists.

- `databaseName` (string): The name of the database to check.

### `ClientDB.collectionExists(databaseName, collectionName)`
Checks if a collection exists in a database.

- `databaseName` (string): The name of the database.
- `collectionName` (string): The name of the collection.

# Example: Advanced TODO App

Let's build a more comprehensive TODO application to showcase the full capabilities of the ClientDB library, including creating collections, adding, updating, deleting items, and utilizing filtering, sorting, and pagination features.

## Steps to Set Up a Project with Vite
Create a new project with Vite. Open a terminal and run the following commands:

```bash
npm create vite@latest my-todo-app -- --template vanilla
cd my-todo-app
```

Install dependencies:

```bash
npm install
```
Install @baxriddin-dev/clientdb:

```bash
npm install @baxriddin-dev/clientdb
```

Set up the project:

Open the project in your text editor and edit the index.html and main.js file.

## Setting up `index.html`

Open index.html and add the following basic HTML structure:

```html
<!-- code -->
```

## Setting up `main.js`

Open main.js and add the following code:

```js
// code
```

## Launch of the project

After setting up the files, run the project:

```bash
npm run dev
```

Open your application in a browser at http://localhost:5173.

# Author and License
## Author
This library was created and is maintained by <a href="https://github.com/baxriddin-dev">Baxriddin Chorshanbiyev.</a>

## License
This project is licensed under the MIT License. See the <a href="./LICENSE">LICENSE</a> file for more details.

Feel free to contact the author for any questions or contributions. 🙂