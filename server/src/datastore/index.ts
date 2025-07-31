import { UserDao } from './dao/UserDao';
import { CommentDao } from './dao/CommentDao';
import { PostDao } from './dao/PostDao';
import { inMemoryDB } from './memorydb';
export interface Datastore extends UserDao, PostDao, CommentDao {}

export const db = new inMemoryDB();
