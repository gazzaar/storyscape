import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';

const API_URL = 'http://localhost:3000';

type AuthContextType = {
  user: User | null;
  signin: (login: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const LOCAL_STORAGE_JWT = 'jwt_token';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT) || '';

    if (jwt) {
      fetch(`${API_URL}/validatetoken`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${jwt}` },
      })
        .then(response => response.json())
        .then(userData => {
          if (userData) {
            setUser(userData.user);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem(LOCAL_STORAGE_JWT);
          }
        })
        .catch(error => {
          console.error('Error loading user from localStorage:', error);
          localStorage.removeItem(LOCAL_STORAGE_JWT);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const signin = async (login: string, password: string) => {
    // Replace with your authentication logic
    const response = await fetch(`${API_URL}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      setIsAuthenticated(true);
      // Store token for persistence
      localStorage.setItem(LOCAL_STORAGE_JWT, data.jwt);
    } else {
      throw new Error('Authentication failed');
    }
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(LOCAL_STORAGE_JWT);
  };

  // const isAuthenticated = !!user;
  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
