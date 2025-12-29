import { createContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

// Create context for authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  // Flow: Get token from localStorage -> Call API to verify -> Set user state
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await authAPI.getMe();
        setUser(response.data);
      } catch (error) {
        // Token invalid, remove it
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  // Login function
  // Flow: Call login API -> Save token -> Set user state
  const login = async (email, password) => {
    const response = await authAPI.login({ email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  // Register function
  // Flow: Call register API -> Save token -> Set user state
  const register = async (name, email, password) => {
    const response = await authAPI.register({ name, email, password });
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  // Logout function
  // Flow: Remove token -> Clear user state
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

