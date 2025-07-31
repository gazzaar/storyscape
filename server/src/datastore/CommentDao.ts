import { Comment } from '../types';
export interface CommentDao {
  listComments(postId: string): Comment[];
  addComment(comment: Comment): void;
  deleteComment(id: string): void;
}
