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
    - [Configuring `index.html`](#configuring-indexhtml)
    - [Configuring `main.js`](#configuring-mainjs)
    - [Launch of the project](#launch-of-the-project)
- [Author and License](#author-and-license)
  - [Author](#author)
  - [License](#license)


# Installation

To install the library, use npm:
```bash
npm install @baxriddin-dev/clientdb

# (or with yarn:)
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
const allProducts = db.products.list();
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

Open the project in your text editor and edit the index.html and main.js file.

## Configuring `index.html`

Open index.html and add the following basic HTML structure:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Advanced TODO App</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      body {
        padding: 10px;
        font-family: "Times New Roman", Times, sans-serif;
      }
      h1 {
        margin-bottom: 20px;
      }
      li {
        list-style: none;
        font-size: 20px;
        display: flex;
        gap: 5px;
        align-items: center;
      }
      li label {
        user-select: none;
        display: flex;
        gap: 5px;
      }
      .todo-head {
        display: flex;
        gap: 20px;
      }
      .checked {
        text-decoration: line-through;
      }
      #todo-list {
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <h1>TODO Application</h1>
    <div class="todo-head">
      <div>
        <input type="text" id="todo-title" placeholder="Title" />
        <button id="add-todo">Add TODO</button>
        <button id="import-data">Import Data</button>
        <button id="export-data">Export Data</button>
      </div>

      <div>
        <input type="text" id="search-input" placeholder="search" />
        <button id="search-btn">Search</button>
        <select id="filter">
          <option selected disabled>Filter</option>
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="not-completed">Not Completed Tasks</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <!-- todo lists -->
    <ul id="todo-list"></ul>

    <script type="module" src="/main.js"></script>
  </body>
</html>
```

## Configuring `main.js`

Open main.js and add the following code:

```js
import { ClientDB } from "@baxriddin-dev/clientdb";

// Initialize the database
const db = new ClientDB("Todo");

// Create the 'todos' collection
db.createCollection("todos");

// Get DOM elements
const titleInput = document.getElementById("todo-title");
const addButton = document.getElementById("add-todo");
const importButton = document.getElementById("import-data");
const exportButton = document.getElementById("export-data");
const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filterSelect = document.getElementById("filter");

// Function to render the TODO list
const renderTodos = async (data) => {
  const todoList = document.getElementById("todo-list");

  // Clear the current list
  todoList.innerHTML = "";

  // Fetch the todos from the database
  let todos = await db.todos.list();

  if (data) {
    todos = data;
  }

  // Create list items for each todo
  todos.forEach((todo) => {
    const listItem = document.createElement("li");

    // Create label to contain checkbox and text
    const label = document.createElement("label");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    todo.completed ? label.classList.add("checked") : label.classList.remove("checked");

    checkbox.addEventListener("change", () => {
      if (!todo.completed) {
        label.classList.add("checked");
      } else {
        label.classList.remove("checked");
      }

      // Update the todo's completion status
      todo.completed = checkbox.checked;
      db.todos.update(todo.$id, { completed: todo.completed });
    });

    // Create text node
    const text = document.createTextNode(todo.title);

    // Append checkbox and text to label
    label.appendChild(checkbox);
    label.appendChild(text);

    // Create edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", () => {
      const newTitle = prompt("Edit TODO title:", todo.title);

      if (newTitle !== null && newTitle.trim() !== "") {
        todo.title = newTitle.trim();
        db.todos.update(todo.$id, { title: todo.title });
        renderTodos();
      }
    });

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
      db.todos.delete(todo.$id);
      renderTodos();
    });

    // Append label, edit and delete buttons to list item
    listItem.appendChild(label);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    todoList.appendChild(listItem);
  });
};

// Add TODO item
addButton.addEventListener("click", () => {
  const title = titleInput.value.trim();

  if (title) {
    db.todos.add({ title, completed: false });
    titleInput.value = "";
    renderTodos();
  } else {
    alert("Please provide a title");
  }
});

// Import data
importButton.addEventListener("click", () => {
  const sampleData = {
    todos: [
      { title: "Sample Task 1", completed: false },
      { title: "Sample Task 2", completed: false },
    ],
  };
  db.importData(sampleData);
  renderTodos();
});

// Export data
exportButton.addEventListener("click", () => {
  const exportedData = db.collections;
  console.log("Exported Data:", exportedData);
  alert("Check the console for exported data.");
});

// Search item
searchButton.addEventListener("click", () => {
  renderTodos(
    db.todos.list({
      search: {
        title: searchInput.value.trim(),
      },
    })
  );
});

// Filter todos
filterSelect.addEventListener("change", () => {
  const filterValue = filterSelect.value;

  let filter = {};
  let sort = {};

  switch (filterValue) {
    case "completed":
      filter = { completed: true }; // Assuming there's a 'completed' field
      break;
    case "not-completed":
      filter = { completed: false }; // Assuming there's a 'completed' field
      break;
    case "asc":
      sort = { $createdAt: "asc" }; // Sort by creation date ascending
      break;
    case "desc":
      sort = { $createdAt: "desc" }; // Sort by creation date descending
      break;
    default:
      filter = {}; // No filter applied
      sort = {}; // No sorting applied
  }

  const options = {
    filter: filter,
    sort: sort,
  };

  const todos = db.todos.list(options);
  renderTodos(todos);
});

// Initial render
renderTodos();
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
