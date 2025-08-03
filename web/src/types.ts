export interface User {
  id: string;
  username: string;
  password: string;
}

export interface Post {
  title: string;
  message: string;
  createdAt: number;
  published: boolean;
  userID: string;
}

export interface Comment {
  comment: string;
  createdAt: number;
  postID: string;
  userID: string;
}
