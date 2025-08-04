export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  published: boolean;
  userID: string;
}

export interface Comment {
  id: string;
  comment: string;
  createdAt: number;
  postID: string;
  userID: string;
}
