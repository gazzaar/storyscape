import express from 'express';
import cors from 'cors';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
const app = express();

app.use(express.json());
app.use(cors());

app.get('/posts', listPostsHandler);

app.post('/posts', createPostHandler);
app.listen(3000);
