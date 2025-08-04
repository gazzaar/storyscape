import { useQuery } from '@tanstack/react-query';
import { getJwtToken } from '../auth/AuthContext';
import { API_URL } from '../config';
import type { User } from '../types';

interface UseGetUserResult {
  user: User | null | undefined;
  error: Error | null;
  isLoading: boolean;
}

export const useGetUser = (userId: string): UseGetUserResult => {
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
    enabled: !!userId,
  });

  return { user, error, isLoading };
};
