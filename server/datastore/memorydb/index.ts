import { Datastore } from '..';
import { User, Post, Comment } from '../../types';

export class inMemoryDB implements Datastore {
  private users: User[] = [];
  private comments: Comment[] = [];
  private posts: Post[] = [];

  async createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.email === email));
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.username === username));
  }

  getUserById(id: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(u => u.id === id));
  }

  listPosts(): Promise<Post[]> {
    return Promise.resolve(this.posts);
  }

  createPost(post: Post): Promise<void> {
    this.posts.push(post);

    return Promise.resolve();
  }

  getPost(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.posts.find(post => post.id === id));
  }

  deletePost(id: string): Promise<void> {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.posts.splice(index, 1);

    return Promise.resolve();
  }

  listComments(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.comments.filter(p => p.id === postId));
  }

  addComment(comment: Comment): Promise<void> {
    this.comments.push(comment);

    return Promise.resolve();
  }

  deleteComment(id: string): Promise<void> {
    const index = this.posts.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.comments.splice(index, 1);

    return Promise.resolve();
  }
}
