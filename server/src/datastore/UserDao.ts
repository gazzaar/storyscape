import { User } from '../types';
export interface UserDao {
  creatUser(user: User): void;
  getUserByEmail(email: string): User | undefined;
  getUserByUsername(username: string): User | undefined;
}
