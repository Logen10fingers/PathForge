// new-react-frontend/src/hooks/useAuth.jsx
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import the AuthContext object

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};