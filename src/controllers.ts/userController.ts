import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../interfaces/user';
import { createUser } from '../utils/createNewUser';
import { v4 as uuidv4, validate as isUuid } from 'uuid';

const users: User[] = [];

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify(users));
};

export const getUserByIdHandler = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!isUuid(userId)) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const user = users.find(u => u.id === userId);
  if (!user) {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  res.writeHead(200);
  res.end(JSON.stringify(user));
};

export const createUserHandler = (req: IncomingMessage, res: ServerResponse) => {
  let body: Buffer[] = [];

  req.on('data', chunk => {
    body.push(chunk);
  });

  req.on('end', () => {
    try {
      const parsedBody = Buffer.concat(body).toString();
      const { username, age, hobbies } = JSON.parse(parsedBody);

      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid data format' }));
        return;
      }

      const newUser = createUser(username, age, hobbies);
      users.push(newUser);

      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};

export const updateUserHandler = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!isUuid(userId)) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  let body: Buffer[] = [];
  req.on('data', chunk => {
    body.push(chunk);
  });

  req.on('end', () => {
    try {
      const parsedBody = Buffer.concat(body).toString();
      const { username, age, hobbies } = JSON.parse(parsedBody);

      if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid data format' }));
        return;
      }

      users[userIndex] = { id: userId, username, age, hobbies };
      res.writeHead(200);
      res.end(JSON.stringify(users[userIndex]));
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};

export const deleteUserHandler = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!isUuid(userId)) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: 'Invalid user ID' }));
    return;
  }

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }

  users.splice(userIndex, 1);
  res.writeHead(204);
  res.end();
};
