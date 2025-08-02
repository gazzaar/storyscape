CREATE TABLE comments (
  id          VARCHAR PRIMARY KEY,
  createdAt   INTEGER NOT NULL,
  comment     VARCHAR NOT NULL,
  postID      VARCHAR NOT NULL,
  userID      VARCHAR NOT NULL,
  FOREIGN KEY(postID) REFERENCES posts(id)
  FOREIGN KEY(userID) REFERENCES users(id)
);
