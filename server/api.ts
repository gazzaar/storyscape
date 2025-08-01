import { Post, User } from './types';

// Post APIs
export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}
export type CreatePostRequest = Omit<Post, 'id' | 'createdAt' | 'userID'>;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

export type SignUpRequest = Omit<User, 'id'>;
export interface SignUpResponse {
  jwt: string;
}

export interface SignInRequest {
  login: string; // username or email
  password: string;
}

export type SignInResponse = {
  user: Omit<User, 'password'>;
  jwt: string;
};

// TODO: Comment APIs
