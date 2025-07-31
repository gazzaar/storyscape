CREATE TABLE users(
  id        VARCHAR PRIMARY KEY,
  username  VARCHAR NOT NULL UNIQUE,
  email     VARCHAR NOT NULL,
  password  VARCHAR NOT NULL
);

CREATE TABLE posts(
  id          VARCHAR PRIMARY KEY,
  title       VARCHAR NOT NULL, 
  createdAt   INTEGER NOT NULL,
  message     VARCHAR NOT NULL,
  published   BOOLEAN NOT NULL,
  userID      VARCHAR NOT NULL,
  FOREIGN KEY(userID) REFERENCES users(id)
);
