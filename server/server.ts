import express from 'express';
import cors from 'cors';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import { initDB } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { requestloggerMiddleware } from './middleware/loggerMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import dotenv from 'dotenv';
import { authMiddleware } from './middleware/authMiddleware';

(async () => {
  await initDB();
  dotenv.config();
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(requestloggerMiddleware);

  // Public
  app.post('/signup', signUpHandler);
  app.post('/signin', signInHandler);

  app.use(authMiddleware);

  // protected
  app.get('/posts', listPostsHandler);
  app.post('/posts', createPostHandler);

  app.use(errHandler);

  app.listen(3000);
})();
