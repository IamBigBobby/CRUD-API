import { IncomingMessage, ServerResponse } from 'http';
import { createUserHandler, deleteUserHandler, getAllUsers, getUserByIdHandler, updateUserHandler } from '../controllers.ts/userController';


export const requestHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader('Content-Type', 'application/json');

  const urlParts = req.url ? req.url.split('/') : [];

  switch (req.method) {
    case 'GET':
      if (req.url === '/api/users') {
        getAllUsers(req, res);
      } else if (urlParts.length === 4 && urlParts[1] === 'api' && urlParts[2] === 'users' && urlParts[3]) {
        console.log('trigger');
        getUserByIdHandler(req, res, urlParts[3]);
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

    case 'PUT':
      if (urlParts.length === 4 && urlParts[1] === 'api' && urlParts[2] === 'users' && urlParts[3]) {
        updateUserHandler(req, res, urlParts[3]);
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    case 'DELETE':
      if (urlParts.length === 4 && urlParts[1] === 'api' && urlParts[2] === 'users' && urlParts[3]) {
        deleteUserHandler(req, res, urlParts[3]);
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
