import * as http from 'http';
import * as dotenv from 'dotenv';
import { requestHandler } from './routes.ts/users';

dotenv.config();
const port = Number(process.env.PORT) || 3000;

const server = http.createServer(requestHandler);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});




