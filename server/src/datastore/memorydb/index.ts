import { Datastore } from '..';
import { User, Post, Comment } from '../../types';

export class inMemoryDB implements Datastore {
  private users: User[] = [];
  private comments: Comment[] = [];
  private posts: Post[] = [];

  creatUser(user: User): void {
    this.users.push(user);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  getUserByUsername(username: string): User | undefined {
    return this.users.find((u) => u.username === username);
  }

  listPosts(): Post[] {
    return this.posts;
  }

  createPost(post: Post): void {
    this.posts.push(post);
  }

  getPost(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  deletePost(id: string): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return;
    }
    this.posts.splice(index, 1);
  }

  listComments(postId: string): Comment[] {
    return this.comments.filter((p) => p.id === postId);
  }

  addComment(comment: Comment): void {
    this.comments.push(comment);
  }

  deleteComment(id: string): void {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return;
    }
    this.comments.splice(index, 1);
  }
}
