import { IncomingMessage, ServerResponse } from 'http';
import { createUserHandler, deleteUserHandler, getAllUsers, getUserByIdHandler, updateUserHandler } from '../controllers.ts/userController';

export const requestHandler = (request: IncomingMessage, response: ServerResponse) => {
  response.setHeader('Content-Type', 'application/json');

  const urlParts = request.url ? request.url.split('/') : [];

  switch (request.method) {
    case 'GET':
      if (request.url === '/api/users') {
        getAllUsers(request, response);
      } else if (urlParts.length === 4 && urlParts[1] === 'api' && urlParts[2] === 'users' && urlParts[3]) {
        getUserByIdHandler(request, response, urlParts[3]);
      } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    case 'POST':
      if (request.url === '/api/users') {
        createUserHandler(request, response);
      } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    case 'PUT':
      if (urlParts.length === 4 && urlParts[1] === 'api' && urlParts[2] === 'users' && urlParts[3]) {
        updateUserHandler(request, response, urlParts[3]);
      } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    case 'DELETE':
      if (urlParts.length === 4 && urlParts[1] === 'api' && urlParts[2] === 'users' && urlParts[3]) {
        deleteUserHandler(request, response, urlParts[3]);
      } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: 'Not Found' }));
      }
      break;

    default:
      response.writeHead(404);
      response.end(JSON.stringify({ message: 'Not Found' }));
      break;
  }
};
