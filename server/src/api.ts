import { Post } from './types';

// Post APIs
export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}
export type CreatePostRequest = Omit<Post, 'id' | 'createdAt'>;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// TODO: User APIs
// TODO: Comment APIs
