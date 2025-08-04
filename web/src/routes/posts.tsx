import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useEffect, useState } from 'react';
import { useAuth, getJwtToken } from '../auth/AuthContext';
import { API_URL } from '../config';
import { CircularProgress, Container, dividerClasses, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Post } from '../components/Post.tsx';

export const Route = createFileRoute('/posts')({
  component: Posts,
});

interface Post {
  id: string;
  title: string;
  message: string;
  createdAt: number;
  published?: string;
  userID: string;
}

function Posts() {
  const { isAuthenticated } = useAuth();

  const token = getJwtToken();
  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Post[], Error>({
    queryKey: ['posts', token], // Include token in queryKey to refetch if token changes
    queryFn: async () => {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.posts as Post[];
    },
    enabled: !!token && isAuthenticated, // Only fetch if token exists and user is authenticated
    retry: 1, // Retry once on failure
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <ProtectedRoute>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : isError ? (
          <Typography color='error'>Error fetching posts: {error?.message}</Typography>
        ) : posts && posts.length > 0 ? (
          <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {posts.map(post => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                userId={post.userID}
                createdAt={post.createdAt}
                message={post.message}
              />
            ))}{' '}
          </Container>
        ) : (
          <Typography>No posts available</Typography>
        )}
      </div>
    </ProtectedRoute>
  );
}
