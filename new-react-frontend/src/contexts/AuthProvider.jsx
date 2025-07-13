// new-react-frontend/src/contexts/AuthProvider.jsx
import React, { useState } from 'react';
import { AuthContext } from './AuthContext'; // Import the AuthContext object

export function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const isAuthenticated = !!authToken;

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
  };

  const contextValue = { authToken, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}