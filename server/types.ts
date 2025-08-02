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

type WithError<T> = T & { error: string };

export type ExpressHandler<req, res> = RequestHandler<
  string,
  Partial<WithError<res>>,
  Partial<req>
>;

export interface JwtObject {
  userId: string;
}

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
