import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const apiUrl = `http://localhost:${port}/api/users`;

beforeAll(async () => {
    try {
      const response = await fetch(apiUrl, { method: 'GET' });
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
    } catch (error) {
      console.error(`
        Please make sure the server is running on port ${port}.
        Use the command "npm run start:dev" in diffrent bash to start the server.
      `);
      process.exit(1);
    }
  });

describe('User API', () => {
  test('should get all users', async () => {
    const response = await fetch(apiUrl, { method: 'GET' });
    const users = await response.json();

    expect(response.status).toBe(200);
    expect(users).toEqual([]);
  });

  test('should create a new user', async () => {
    const newUser = {
      username: 'John Doe',
      age: 30,
      hobbies: ['reading', 'traveling']
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    const createdUser = await response.json();

    expect(response.status).toBe(201);
    expect(createdUser).toMatchObject(newUser);
    expect(createdUser).toHaveProperty('id');
  });

  test('should delete a user', async () => {
    const newUser = {
      username: 'Jane Doe',
      age: 25,
      hobbies: ['dancing', 'cooking']
    };

    const createResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    const createdUser = await createResponse.json();

    const deleteResponse = await fetch(`${apiUrl}/${createdUser.id}`, {
      method: 'DELETE'
    });

    expect(deleteResponse.status).toBe(204);

    const getResponse = await fetch(`${apiUrl}/${createdUser.id}`, { method: 'GET' });
    expect(getResponse.status).toBe(404);
  });
});
