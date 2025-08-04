import { useQuery } from '@tanstack/react-query';
import { getJwtToken } from '../auth/AuthContext';
import { API_URL } from '../config';
import type { Post } from '../types';

interface UseGetPostResult {
  post: Post | null | undefined;
  error: Error | null;
  isLoading: boolean;
}
export const useGetPost = (postId: string): UseGetPostResult => {
  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`post-${postId}`],
    queryFn: async () => {
      const jwt = getJwtToken();
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'GET', // Use GET for fetching data
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Post not found');
      }

      const data = await response.json();
      // Validate response structure
      if (!data || !data.post) {
        throw new Error('Invalid response format');
      }

      return data.post as Post;
    },
  });
  return { post, error, isLoading };
};
