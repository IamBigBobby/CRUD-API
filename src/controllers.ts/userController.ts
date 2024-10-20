import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../interfaces/user';
import { createUser } from '../utils/createNewUser';

const users: User[] = [];

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200);
  res.end(JSON.stringify(users));
};

export const createUserHandler = (req: IncomingMessage, res: ServerResponse) => {
  let body: Buffer[] = [];

  req.on('data', chunk => {
    body.push(chunk);
  });

  req.on('end', () => {
    try {
      const parsedBody = Buffer.concat(body).toString();

      if (!parsedBody) {
        throw new Error('Request body is empty');
      }

      const { username, age, hobbies } = JSON.parse(parsedBody);

      if (!username || !age || !Array.isArray(hobbies)) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid data format' }));
        return;
      }

      const newUser = createUser(username, age, hobbies);
      users.push(newUser);

      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    } catch (error) {
      console.error('Error occurred during POST request:', error);
      res.writeHead(500);
      res.end(JSON.stringify({ message: 'Server error' }));
    }
  });
};
