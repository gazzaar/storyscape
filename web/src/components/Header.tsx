import { Box, Button, Stack } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '../auth/AuthContext';

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
      direction="row"
    >
      <h1>StorySpace</h1>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            <span>Welcome, {user?.username}!</span>
            <Button variant="outlined" onClick={handleLogout} sx={{ textTransform: 'none' }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button variant="text" sx={{ textTransform: 'none' }}>
                SignIn
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="contained" sx={{ textTransform: 'none' }}>
                SignUp
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Stack>
  );
};
