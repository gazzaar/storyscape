import { Box, Button, TextareaAutosize, TextField } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { getJwtToken } from '../auth/AuthContext';
import { API_URL } from '../config';

export const AddComment = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient();
  const createComment = useMutation({
    mutationFn: async ({ comment }: { comment: string }) => {
      const jwt = getJwtToken();
      if (!jwt) {
        throw Error('Invalid Token');
      }

      const response = await fetch(`${API_URL}/comments/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw Error('Failed to add comment');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`comment-${postId}`] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createComment.mutateAsync({ comment });
  };
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <TextareaAutosize
        required
        aria-label='post-text'
        placeholder='Add your thoughts on that..'
        style={{
          background: 'none',
          width: '100%',
          minHeight: 100,
          maxHeight: '300px',
          resize: 'vertical',
          padding: '.6rem 0 ',
          fontFamily: 'inherit',
        }}
        name='message'
        id='password'
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        Add Comment{' '}
      </Button>
    </Box>
  );
};
