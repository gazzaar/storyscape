import { Box, Button, Stack } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';
import '../styles/link.css';

export const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  return (
    <Stack
      sx={{ display: 'flex', justifyContent: 'space-between', m: 2, alignItems: 'center' }}
      direction='row'
    >
      <Link to='/' className='link' style={{ textDecoration: 'none' }}>
        <h1>StorySpace</h1>
      </Link>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}!</span>
            <Button variant='outlined' onClick={handleLogout} sx={{ textTransform: 'none' }}>
              Logout
            </Button>

            <Link to='/posts'>
              <Button variant='contained' sx={{ textTransform: 'none' }}>
                Posts
              </Button>
            </Link>

            <Link to='/create-post'>
              <Button variant='contained' sx={{ textTransform: 'none' }}>
                new Post
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to='/signin'>
              <Button variant='text' sx={{ textTransform: 'none' }}>
                SignIn
              </Button>
            </Link>
            <Link to='/signup'>
              <Button variant='contained' sx={{ textTransform: 'none' }}>
                SignUp
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Stack>
  );
};
