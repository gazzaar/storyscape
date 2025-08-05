import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Box, Paper, Typography, Alert, TextField, Button, TextareaAutosize } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getJwtToken } from '../auth/AuthContext';
import { API_URL } from '../config';
import '../styles/text-area.css';

export const Route = createFileRoute('/create-post')({
  component: CreatePostRoute,
});

function CreatePostRoute() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createPost = useMutation({
    mutationFn: async ({ title, message }: { title: string; message: string }) => {
      const jwt = getJwtToken();

      if (!jwt) {
        throw Error('Invalid Token');
      }
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }
    },
    onSuccess: () => {
      const jwt = getJwtToken();
      queryClient.invalidateQueries({ queryKey: ['posts', jwt] });
      navigate({ to: '/posts' });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createPost.mutateAsync({ title, message });
  };

  return (
    <ProtectedRoute>
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
            Create new Post
          </Typography>

          <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='title'
              label='Title'
              name='title'
              autoFocus
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextareaAutosize
              required
              aria-label='post-text'
              placeholder='your post here....'
              className='textarea-post'
              name='message'
              id='password'
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Create Post
            </Button>
          </Box>
        </Paper>
      </Box>
    </ProtectedRoute>
  );
}
