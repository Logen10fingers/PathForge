// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\contexts\AuthProvider.jsx

import React, { useState, useEffect, useCallback } from "react";
// 🛑🛑🛑 CRITICAL: REMOVE THIS LINE ENTIRELY 🛑🛑🛑
// import jwtDecode from 'jwt-decode';

// Import AuthContext from its dedicated file to fix Fast Refresh warning.
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => {
    // Initialize token from localStorage.
    return localStorage.getItem("authToken");
  });
  // For DRF Token Authentication, the token is opaque. We don't decode it.
  const [user, setUser] = useState(null);

  const login = useCallback((token) => {
    setAuthToken(token);
    localStorage.setItem("authToken", token);
    // Set a placeholder user or fetch user details from your backend if available
    setUser({ isAuthenticated: true, username: "Authenticated User" });
    console.log("Token stored:", token);
  }, []);

  const logout = useCallback(() => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    console.log("Logged out. Token removed.");
  }, []);

  useEffect(() => {
    // This effect ensures user state is consistent with authToken.
    if (authToken) {
      setUser({ isAuthenticated: true, username: "Authenticated User" });
    } else {
      setUser(null);
    }
  }, [authToken]);

  const authContextValue = {
    authToken,
    user,
    login,
    logout,
    isAuthenticated: !!authToken, // Boolean derived from token presence
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
