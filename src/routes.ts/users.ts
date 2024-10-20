import { IncomingMessage, ServerResponse } from 'http';
import { createUserHandler, getAllUsers } from '../controllers.ts/userController';

export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');

  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {
        getAllUsers(req, res);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    case 'POST':
      if (req.url === '/api/users') {
        createUserHandler(req, res);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Not Found' }));
      break;
  }
};

