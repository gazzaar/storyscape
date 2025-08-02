import path from 'path';
import { Database, open as sqliteOpen } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Datastore } from '..';
import { Comment, Post, User } from '../../types';

export class SqlDataStore implements Datastore {
  private db!: Database<sqlite3.Database, sqlite3.Statement>;
  public async openDb() {
    // open the database
    this.db = await sqliteOpen({
      filename: path.join(__dirname, 'storyscape.sqlite'),
      driver: sqlite3.Database,
    });

    this.db.run('PRAGMA foreign_keys = ON;');

    await this.db.migrate({
      migrationsPath: path.join(__dirname, 'migrations'),
    });
    return this;
  }

  async createUser(user: User): Promise<void> {
    await this.db.run(
      'INSERT INTO users (id,username,email,password) VALUES (?,?,?,?)',
      user.id,
      user.username,
      user.email,
      user.password
    );
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE email = ?`, email);
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE username = ?`, username);
  }

  getUserById(id: string): Promise<User | undefined> {
    return this.db.get<User>(`SELECT * FROM users WHERE id = ?`, id);
  }

  listPosts(): Promise<Post[]> {
    return this.db.all<Post[]>('SELECT * FROM posts');
  }

  async createPost(post: Post): Promise<void> {
    await this.db.run(
      'INSERT INTO posts(id,title,message,createdAt,published,userID) VALUES (?,?,?,?,?,?)',
      post.id,
      post.title,
      post.message,
      post.createdAt,
      post.published,
      post.userID
    );
  }

  async getPost(id: string): Promise<Post | undefined> {
    return await this.db.get<Post>(
      `
        SELECT 1 FROM  posts WHERE id = ?`,
      id
    );
  }
  deletePost(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  listComments(postId: string): Promise<Comment[]> {
    return this.db.all<Comment[]>(
      `SELECT * FROM comments WHERE postID = ? ORDER BY createdAT DESC`,
      postId
    );
  }

  async addComment(comment: Comment): Promise<void> {
    await this.db.run(
      'INSERT INTO comments (id,comment,createdAt,postID,userID) VALUES (?,?,?,?,?)',
      comment.id,
      comment.comment,
      comment.createdAt,
      comment.postID,
      comment.userID
    );
  }
  deleteComment(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
