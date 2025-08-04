import { useQuery } from '@tanstack/react-query';
import { getJwtToken } from '../auth/AuthContext';
import { API_URL } from '../config';
import type { Comment } from '../types';

interface UseGetCommentsResult {
  comments: Comment[] | null | undefined;
  error: Error | null;
  isLoading: boolean;
}
export const useGetComments = (postId: string): UseGetCommentsResult => {
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`comment-${postId}`],
    queryFn: async () => {
      const jwt = getJwtToken();
      const response = await fetch(`${API_URL}/comments/${postId}`, {
        method: 'GET', // Use GET for fetching data
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('No Comments');
      }

      const data = await response.json();
      // Validate response structure
      if (!data || !data.comments) {
        throw new Error('Invalid response format');
      }

      return data.comments as Comment[];
    },
  });
  return { comments, error, isLoading };
};
