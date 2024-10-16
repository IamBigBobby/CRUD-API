import * as http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Server is running\n');
  });
  
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

// const users: any[] = [];

// const requestListener = (req: http.IncomingMessage, res: http.ServerResponse) => {
//   res.setHeader('Content-Type', 'application/json');

//   if (req.method === 'GET' && req.url === '/api/users') {
//     res.writeHead(200);
//     res.end(JSON.stringify(users));
//   } else if (req.method === 'POST' && req.url === '/api/users') {
//     let body: Buffer[] = [];

//     req.on('data', (chunk: Buffer<ArrayBufferLike>) => {
//       body.push(chunk);
//     });

//     req.on('end', () => {
//       const user = JSON.parse(Buffer.concat(body).toString());
//       users.push(user);
//       res.writeHead(201);
//       res.end(JSON.stringify(user));
//     });
//   } else {
//     res.writeHead(404);
//     res.end(JSON.stringify({ message: 'Not Found' }));
//   }
// };

// const server = http.createServer(requestListener);

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
