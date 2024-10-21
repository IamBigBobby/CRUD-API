import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../interfaces/user';
import { createUser } from '../utils/createNewUser';
import { v4 as uuidv4, validate as isUuid } from 'uuid';

const users: User[] = [];

export const getAllUsers = (request: IncomingMessage, response: ServerResponse) => {
  response.writeHead(200);
  response.end(JSON.stringify(users));
};

export const getUserByIdHandler = (request: IncomingMessage, response: ServerResponse, userId: string) => {
  if (!isUuid(userId)) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    response.writeHead(404);
    response.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  response.writeHead(200);
  response.end(JSON.stringify(user));
};

export const createUserHandler = (request: IncomingMessage, response: ServerResponse) => {
  let body: Buffer[] = [];

  request.on('data', chunk => {
    body.push(chunk);
  });

  request.on('end', () => {
    try {
      const parsedBody = Buffer.concat(body).toString();
      const { username, age, hobbies } = JSON.parse(parsedBody);

      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        response.writeHead(400);
        response.end(JSON.stringify({ message: 'Invalid data format' }));
        return;
      }

      const newUser = createUser(username, age, hobbies);
      users.push(newUser);

      response.writeHead(201);
      response.end(JSON.stringify(newUser));
    } catch (error) {
      response.writeHead(500);
      response.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};

export const updateUserHandler = (request: IncomingMessage, response: ServerResponse, userId: string) => {
  if (!isUuid(userId)) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    response.writeHead(404);
    response.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  let body: Buffer[] = [];
  request.on('data', chunk => {
    body.push(chunk);
  });

  request.on('end', () => {
    try {
      const parsedBody = Buffer.concat(body).toString();
      const { username, age, hobbies } = JSON.parse(parsedBody);

      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        response.writeHead(400);
        response.end(JSON.stringify({ message: 'Invalid data format' }));
        return;
      }

      users[userIndex] = { id: userId, username, age, hobbies };
      response.writeHead(200);
      response.end(JSON.stringify(users[userIndex]));
    } catch (error) {
      response.writeHead(500);
      response.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};

export const deleteUserHandler = (request: IncomingMessage, response: ServerResponse, userId: string) => {
  if (!isUuid(userId)) {
    response.writeHead(400);
    response.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    response.writeHead(404);
    response.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);
  response.writeHead(204);
  response.end();
};
