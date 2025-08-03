import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '../types';
import { API_URL } from '../config';

type AuthContextType = {
  user: User | null | undefined;
  signin: (login: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const LOCAL_STORAGE_JWT = 'jwt_token';

export const getJwtToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_JWT) || '';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [user, setUser] = useState<User | null>(null);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User | null, Error>({
    queryKey: ['validateToken'],
    queryFn: async () => {
      const jwt = getJwtToken();
      if (!jwt) {
        return null; // No JWT, skip fetch
      }

      const response = await fetch(`${API_URL}/validatetoken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jwt }),
      });

      if (!response.ok) {
        throw new Error('Invalid token');
      }

      const data = await response.json();
      return data.user as User;
    },
    retry: false, // Don't retry on failure
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
  });

  const isAuthenticated = !!user;

  // useEffect(() => {
  //   const jwt = getJWtToekn();
  //
  //   if (jwt) {
  //     fetch(`${API_URL}/validatetoken`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ jwt }),
  //     })
  //       .then(response => response.json())
  //       .then(userData => {
  //         if (userData) {
  //           setUser(userData.user);
  //           setIsAuthenticated(true);
  //         } else {
  //           localStorage.removeItem(LOCAL_STORAGE_JWT);
  //         }
  //       })
  //       .catch(error => {
  //         console.error('Error loading user from localStorage:', error);
  //         localStorage.removeItem(LOCAL_STORAGE_JWT);
  //       })
  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);

  const signin = async (login: string, password: string) => {
    // Replace with your authentication logic
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    localStorage.setItem(LOCAL_STORAGE_JWT, data.jwt);
    // Invalidate query to refetch user data
    queryClient.invalidateQueries({ queryKey: ['validateToken'] });
  };

  const signup = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error('Sign up failed');
    }

    const data = await response.json();
    localStorage.setItem(LOCAL_STORAGE_JWT, data.jwt);
    // Invalidate query to refetch user data
    queryClient.invalidateQueries({ queryKey: ['validateToken'] });
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_JWT);
    queryClient.setQueryData(['validateToken'], null); // Clear user data
    queryClient.invalidateQueries({ queryKey: ['validateToken'] });
  };

  // const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, signin, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
