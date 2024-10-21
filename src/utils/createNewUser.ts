import { v4 as uuidv4 } from 'uuid';
import { User } from '../interfaces/user';

export const createUser = (username: string, age: number, hobbies: string[]): User => {
    return {
      id: uuidv4(),
      username,
      age,
      hobbies,
    };
};