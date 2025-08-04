import {
  CreatePostRequest,
  CreatePostResponse,
  GetPostRequest,
  GetPostResponse,
  ListPostRequest,
  ListPostResponse,
} from '../api';
import { db } from '../datastore';
import { ExpressHandler, ExpressHandlerWithParams, Post } from '../types';
import crypto from 'crypto';

export const listPostsHandler: ExpressHandler<ListPostRequest, ListPostResponse> = async (
  _req,
  res
) => {
  res.send({ posts: await db.listPosts() });
};

export const createPostHandler: ExpressHandler<CreatePostRequest, CreatePostResponse> = async (
  req,
  res
) => {
  if (!req.body.title || !req.body.message || !req.body.published) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    title: req.body.title,
    message: req.body.message,
    userID: res.locals.userId,
    published: req.body.published,
  };

  await db.createPost(post);
  res.sendStatus(200);
};

// Get Post
export const getPostHandler: ExpressHandlerWithParams<
  { postId: string },
  GetPostRequest,
  GetPostResponse
> = async (req, res) => {
  const postId = req.params.postId;

  if (!postId) {
    return res.sendStatus(400);
  }
  const post = await db.getPost(postId);
  if (!post) {
    return res.status(400).send({ error: 'No post found' });
  }
  res.status(200).send({
    post: {
      title: post.title,
      createdAt: post.createdAt,
      id: post.id,
      message: post.message,
      userID: post.userID,
    },
  });
};
