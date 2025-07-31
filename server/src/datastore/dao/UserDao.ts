import { User } from '../../types';
export interface UserDao {
  creatUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
}
