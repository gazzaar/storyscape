import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostRequest,
  ListPostResponse,
} from '../api';
import { db } from '../datastore';
import { ExpressHandler, Post } from '../types';
import crypto from 'crypto';

export const listPostsHandler: ExpressHandler<
  ListPostRequest,
  ListPostResponse
> = async (_req, res) => {
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  if (
    !req.body.title ||
    !req.body.message ||
    !req.body.userID ||
    !req.body.published
  ) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    title: req.body.title,
    message: req.body.message,
    userID: req.body.userID,
    published: req.body.published,
  };

  await db.createPost(post);
  res.sendStatus(200);
};
