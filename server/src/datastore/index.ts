import { UserDao } from './dao/UserDao';
import { CommentDao } from './dao/CommentDao';
import { PostDao } from './dao/PostDao';
// import { inMemoryDB } from './memorydb';
import { SqlDataStore } from './sql';
export interface Datastore extends UserDao, PostDao, CommentDao {}

export let db: Datastore;
export async function initDB() {
  db = await new SqlDataStore().openDb();
}
