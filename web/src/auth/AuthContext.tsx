import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '../types';

type AuthContextType = {
  user: User | null;
  signin: (user: User) => void;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_token');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('user_token');
      }
    }
    setIsLoading(false);
  }, []);

  const signin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('user_token', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_token');
  };

  const isAuthenticated = !!user;
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
