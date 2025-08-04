import express from 'express';
import cors from 'cors';
import { createPostHandler, getPostHandler, listPostsHandler } from './handlers/postHandler';
import { initDB } from './datastore';
import { getUser, signInHandler, signUpHandler, validateToken } from './handlers/authHandler';
import { requestloggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';
import { createCommentHandler, listCommentsHandler } from './handlers/commentHandler';

(async () => {
  await initDB();
  dotenv.config();
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(requestloggerMiddleware);

  // Public
  app.get('/healthz', (req, res) => res.send({ status: 'OK' }));
  app.post('/signup', signUpHandler);
  app.post('/signin', signInHandler);

  app.post('/validatetoken', validateToken);

  app.use(authMiddleware);

  // protected
  app.get('/posts', listPostsHandler);
  app.post('/posts', createPostHandler);
  app.get('/posts/:postId', getPostHandler);

  // User
  app.post('/user', getUser);
  // Comments
  app.get('/comments/:postId', listCommentsHandler);
  app.post('/comments/:postId', createCommentHandler);
  app.use(errHandler);

  app.listen(3000);
})();
