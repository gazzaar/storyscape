import { db } from '../datastore';
import { ExpressHandler, Post } from '../types';
import crypto from 'crypto';

type CreatePostRequest = Omit<Post, 'id' | 'createdAt'>;
interface CreatePostResponse {}

export const listPostsHandler: ExpressHandler<{}, {}> = (_req, res) => {
  res.send({ posts: db.listPosts() });
  res.end();
};

export const createPostHandler: ExpressHandler<
  CreatePostRequest,
  CreatePostResponse
> = (req, res) => {
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

  db.createPost(post);
  res.sendStatus(200);
};
