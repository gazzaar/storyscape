import { RequestHandler } from 'express';

export interface User {
  id: string;
  username: String;
  password: String;
  email: String;
}

export interface Post {
  id: string;
  title: String;
  message: String;
  createdAt: number;
  published: Boolean | undefined;
  userID: string;
}

export interface Comment {
  id: string;
  comment: String;
  createdAt: number;
  postID: string;
  userID: string;
}

export type ExpressHandler<req, res> = RequestHandler<
  string,
  Partial<res>,
  Partial<req>
>;
