import { Post } from '../types';
export interface PostDao {
  listPosts(): Post[];
  createPost(post: Post): void;
  getPost(id: number): Post | undefined;
  deletePost(id: number): void;
}
