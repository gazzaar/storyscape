export interface User {
  id: Number;
  username: String;
  password: String;
  email: String;
}

export interface Post {
  id: Number;
  title: String;
  message: String;
  createdAt: String;
  published: Boolean;
  userID: Number;
}

export interface Comment {
  id: Number;
  comment: String;
  createdAt: String;
  postID: Number;
  userID: Number;
}
