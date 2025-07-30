import { UserDao } from './UserDao';
import { CommentDao } from './CommentDao';
import { PostDao } from './PostDao';
import { inMemoryDB } from './memorydb';
export interface Datastore extends UserDao, PostDao, CommentDao {}

export const db = new inMemoryDB();
