import { Box, Button, Paper, Typography } from '@mui/material';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate({ to: '/signin', replace: true });
    return null;
  }

  if (isAuthenticated) {
    navigate({ to: '/posts' });
    return null;
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Welcome to StorySpace
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        {isAuthenticated ? (
          <Box>
            <Typography variant='h6'>Hello, {user?.username}!</Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              You are successfully authenticated.
            </Typography>
            <Link to='/create-post'>Create new Post</Link>
          </Box>
        ) : (
          <Box>
            <Typography variant='h6'>Welcome to StorySpace</Typography>
            <Typography variant='body1' sx={{ mt: 2 }}>
              Please sign in or sign up to continue.
            </Typography>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Link to='/signin'>
                <Button variant='contained'>Sign In</Button>
              </Link>
              <Link to='/signup'>
                <Button variant='outlined'>Sign Up</Button>
              </Link>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
