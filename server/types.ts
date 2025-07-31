import { RequestHandler } from 'express';

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface Post {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  published: Boolean;
  userID: string;
}

export interface Comment {
  id: string;
  comment: string;
  createdAt: number;
  postID: string;
  userID: string;
}

export type ExpressHandler<req, res> = RequestHandler<string, Partial<res>, Partial<req>>;
