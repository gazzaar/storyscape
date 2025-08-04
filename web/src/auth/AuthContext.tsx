import React, { createContext, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User } from '../types';
import { API_URL } from '../config';

type AuthContextType = {
  user: User | null | undefined;
  signin: ReturnType<
    typeof useMutation<{ jwt: string; user: User }, Error, { login: string; password: string }>
  >;
  signup: ReturnType<
    typeof useMutation<
      { jwt: string },
      Error,
      { username: string; email: string; password: string }
    >
  >;

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
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null, Error>({
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

  const signin = useMutation({
    mutationFn: async ({ login, password }: { login: string; password: string }) => {
      const response = await fetch(`${API_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error('Auth failed');
      }

      const data = await response.json();
      return data;
    },

    onSuccess: data => {
      localStorage.setItem(LOCAL_STORAGE_JWT, data.jwt);

      if (data.user) {
        queryClient.setQueryData(['validateToken'], data.user);
      } else {
        queryClient.invalidateQueries({ queryKey: ['validateToken'] });
      }
    },
  });

  const signup = useMutation({
    mutationFn: async ({
      username,
      email,
      password,
    }: {
      username: string;
      email: string;
      password: string;
    }) => {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data = await response.json();
      return data;
    },
    onSuccess: data => {
      localStorage.setItem(LOCAL_STORAGE_JWT, data.jwt);

      queryClient.invalidateQueries({ queryKey: ['validateToken'] });
    },
  });

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_JWT);
    queryClient.setQueryData(['validateToken'], null); // Clear user data
    queryClient.invalidateQueries({ queryKey: ['validateToken'] });
  };

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
