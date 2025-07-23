import express from 'express';
const app = express();

app.get('/posts', (req, res) => {
  res.send('Hello from blog api');
  res.end();
});

app.listen(3000, (err) => {
  console.log('server started');
});
