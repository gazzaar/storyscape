import { Box, Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config';
import { getJwtToken } from '../auth/AuthContext';
import type { User } from '../types';

export const Post = ({
  userId,
  title,
  createdAt,
  message,
}: {
  userId: string;
  title: string;
  message: string;
  createdAt: number;
}) => {
  const { user, error, isLoading } = useGetUser(userId);
  const userName = isLoading || !user ? '...' : error ? '<unknown>' : user.username;

  const date = new Date(createdAt);
  return (
    <Container
      sx={{
        border: '1px solid #333',
        cursor: 'pointer',
        p: '0.8rem 1.2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Container>
        <Typography variant='h4' sx={{ fontSize: '1.8rem' }}>
          {title}
        </Typography>
        <Typography variant='body2' sx={{ color: 'gray', fontSize: '1.4rem' }}>
          {message}
        </Typography>
        <Typography>{date.toLocaleString()}</Typography>
      </Container>
      <Typography>{userName}</Typography>
    </Container>
  );
};

interface UseGetUserResult {
  user: User | null | undefined;
  error: Error | null;
  isLoading: boolean;
}

const useGetUser = (userId: string): UseGetUserResult => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const jwt = getJwtToken();
      if (!jwt) {
        throw new Error('No JWT token found');
      }

      const response = await fetch(`${API_URL}/user`, {
        method: 'POST', // Use GET for fetching data
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('User not found');
      }

      const data = await response.json();
      // Validate response structure
      if (!data || !data.user) {
        throw new Error('Invalid response format');
      }

      return data.user as User;
    },
  });

  return { user, error, isLoading };
};
