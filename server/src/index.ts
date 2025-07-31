import express, { ErrorRequestHandler } from 'express';
import cors from 'cors';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import { initDB } from './datastore';
import { signInHandler, signUpHandler } from './handlers/userHandler';

(async () => {
  await initDB();
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get('/posts', listPostsHandler);

  app.post('/posts', createPostHandler);

  // app.get('/signUp', signUpHandler);
  app.post('/signup', signUpHandler);
  app.post('/signin', signInHandler);

  const errHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error('Uncought Error', err);
    return res.status(500).send('Oops, an unExpected Error happend, please try again');
  };

  app.use(errHandler);

  app.listen(3000);
})();
