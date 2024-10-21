# User Management API

This project is an API for managing users, developed with Node.js. It supports basic CRUD (Create, Read, Update, Delete) operations and uses an in-memory data structure to store users.

## Description

The API allows the following actions:

- **Get all users**: `GET /api/users`
- **Get a user by ID**: `GET /api/users/:id`
- **Create a new user**: `POST /api/users`
- **Update an existing user**: `PUT /api/users/:id`
- **Delete a user**: `DELETE /api/users/:id`

## Project Structure

```
/src
  ├── controllers
  │   └── userController.ts  # Controllers for handling requests
  ├── interfaces
  │   └── user.ts             # User interface
  └── utils
      └── createNewUser.ts    # Utility for creating a new user
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository>
   cd <project_folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Running the Application

Start the server in develop mode:

```bash
npm start:dev
```

Start the server in product mode:

```bash
npm start:prod
```

The API will be available at `http://localhost:4000/api`.

## Example Requests

Use postman for convenient check

- **Create a user**:

```
POST http://localhost:4000/api/users 

raw mode:
'{"username": "JohnDoe", "age": 30, "hobbies": ["reading", "gaming"]}'
```

- **Get all users**:

```
GET http://localhost:4000/api/users
```

- **Get a user by ID**:

```
GET http://localhost:4000/api/users/<userId>
```

- **Update a user**:

```
PUT http://localhost:4000/api/users/<userId> 

raw mode:
'{"username": "JaneDoe", "age": 25, "hobbies": ["sports"]}'
```

- **Delete a user**:

```
DELETE http://localhost:4000/api/users/<userId>
```

## Technologies

- Node.js
- TypeScript
- HTTP
- Jest

