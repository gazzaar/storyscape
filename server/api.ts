import { Post, User, Comment } from './types';

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

export interface GetUserRequest {
  userId: string;
}

export interface GetUserResponse {
  user: Omit<User, 'password'>;
}

export interface ValidateTokenRequest {
  jwt: string;
}

export type ValidateTokenResponse = {
  user: Omit<User, 'password'>;
  jwt: string;
};
export interface ListCommentsRequest {}

export interface ListCommentsResponse {
  comments: Comment[];
}

export type CreateCommentRequest = Pick<Comment, 'comment'>;

export interface CreateCommentResponse {}
