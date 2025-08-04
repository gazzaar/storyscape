import { createFileRoute, Link } from '@tanstack/react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Container, dividerClasses } from '@mui/material';
import { createDate } from '../util/createDate';
import { useGetPost } from '../hooks/useGetPost';
import { useGetUser } from '../hooks/useGetUser';
import { useGetComments } from '../hooks/useGetComments';
import { Comment } from '../components/Comment';

export const Route = createFileRoute('/post/$postId')({
  component: PostComponent,
});

function PostComponent() {
  const { postId } = Route.useParams();
  const { post, error, isLoading } = useGetPost(postId);
  const { user } = useGetUser(post?.userID || '');
  const { comments } = useGetComments(postId);

  if (!post) return <h1>No Post found</h1>;
  if (!user) return <h1>No Post found</h1>;

  const postTime = createDate(post.createdAt);

  return (
    <ProtectedRoute>
      <Container sx={{ p: '2rem', border: '1px solid #333', borderRadius: '4px' }}>
        <h2>
          {post.title} <span></span>
        </h2>
        <p>{post.message}</p>
        <p>Date: {postTime}</p>
        <p>Auther: {user.username}</p>
        {comments && comments?.length > 0 ? (
          <>
            <div>Comments:</div>
            {comments.map(comment => (
              <Comment
                key={comment.id}
                userID={comment.userID}
                comment={comment.comment}
                createdAt={comment.createdAt}
              />
            ))}
          </>
        ) : (
          <p>No comments</p>
        )}

        <Link to='/posts'>Back to posts</Link>
      </Container>
    </ProtectedRoute>
  );
}
