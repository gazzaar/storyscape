import { Comment } from '../../types';
export interface CommentDao {
  listComments(postId: string): Promise<Comment[]>;
  addComment(comment: Comment): Promise<void>;
  deleteComment(id: string): Promise<void>;
}
