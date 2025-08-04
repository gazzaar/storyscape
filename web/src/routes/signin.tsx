import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { AuthRoute } from '../components/AuthRoute';

export const Route = createFileRoute('/signin')({
  component: SignIn,
});

function SignIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace this with your actual API call
      await signin.mutateAsync({ login, password });
      navigate({ to: '/' });
    } catch (err) {}
  };

  return (
    <AuthRoute>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant='h4' component='h1' gutterBottom align='center'>
            Sign In
          </Typography>

          {signin.isError && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {signin.isError}
            </Alert>
          )}

          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Paper>
      </Box>
    </AuthRoute>
  );
}
