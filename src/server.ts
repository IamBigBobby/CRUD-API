import * as http from 'http';
import * as dotenv from 'dotenv';
import { User } from './interface/user';
import { createUser } from './utils/createNewUser';

dotenv.config();
const port = Number(process.env.PORT) || 3000;

const users: User[] = [];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/api/users') {
    console.log('trigger get');
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else if (req.method === 'POST' && req.url === '/api/users') {

    let body: Buffer[] = [];
    console.log('trigger post')
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
  }
  })
  
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });



