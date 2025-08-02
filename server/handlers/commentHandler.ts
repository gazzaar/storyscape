import {
  CreateCommentRequest,
  CreateCommentResponse,
  ListCommentsResponse,
  ListCommentsRequest,
} from '../api';
import { db } from '../datastore';
import { Comment, ExpressHandlerWithParams } from '../types';
import crypto from 'crypto';

export const createCommentHandler: ExpressHandlerWithParams<
  { postId: string },
  CreateCommentRequest,
  CreateCommentResponse
> = async (req, res) => {
  if (!req.params.postId) {
    return res.sendStatus(400);
  }
  if (!req.body.comment) {
    return res.sendStatus(400);
  }

  if (!(await db.getPost(req.params.postId))) {
    return res.status(400).send({ error: 'Post not found' });
  }

  const comment: Comment = {
    id: crypto.randomUUID(),
    comment: req.body.comment,
    createdAt: Date.now(),
    postID: req.params.postId,
    userID: res.locals.userId,
  };

  await db.addComment(comment);
  return res.sendStatus(200);
};

export const listCommentsHandler: ExpressHandlerWithParams<
  { postId: string },
  ListCommentsRequest,
  ListCommentsResponse
> = async (req, res) => {
  if (!req.params.postId) return res.sendStatus(400);
  const comments = await db.listComments(req.params.postId);
  return res.send({ comments });
};
