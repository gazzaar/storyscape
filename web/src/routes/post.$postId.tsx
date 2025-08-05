import { createFileRoute, Link } from '@tanstack/react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Box, Container, dividerClasses, Typography } from '@mui/material';
import { createDate } from '../util/createDate';
import { useGetPost } from '../hooks/useGetPost';
import { useGetUser } from '../hooks/useGetUser';
import { useGetComments } from '../hooks/useGetComments';
import { Comment } from '../components/Comment';
import { AddComment } from '../components/AddComment';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import '../styles/link.css';

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
      <Container sx={{ p: '2rem', border: '1px solid #333', borderRadius: '4px', mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link to='/posts' className='link link-conatiner'>
              <KeyboardBackspaceIcon />
            </Link>

            <Typography
              variant='body2'
              sx={{
                fontSize: '1.4rem',
                fontWeight: 'bold',
                border: '1px solid #333',
                display: 'inline-block',
                padding: '4px 6px',
                borderRadius: '6px',
              }}
            >
              {user.username}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: '1rem',
            }}
          >
            {postTime}
          </Typography>
        </Box>

        <Typography
          sx={{
            fontSize: '1.6rem',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          {post.title}
        </Typography>
        <Typography sx={{ padding: '.8rem 1.2rem', border: '1px solid #333', borderRadius: '4px' }}>
          {post.message}
        </Typography>
      </Container>

      <Container
        sx={{
          mb: 2,
          p: '2rem',
          border: '1px solid #333',
          borderRadius: '4px',
        }}
      >
        <AddComment postId={postId} />
      </Container>

      <Container sx={{ p: '2rem 2rem .5rem 2rem', border: '1px solid #333', borderRadius: '4px' }}>
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
      </Container>
    </ProtectedRoute>
  );
}
