import { Comment } from '../types';
export interface CommentDao {
  listComments(postId: number): Comment[];
  addComment(comment: Comment): void;
  deleteComment(id: number): void;
}
