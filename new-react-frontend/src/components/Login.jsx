// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Updated import path for useAuth
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  useToast // Import useToast for better error/success messages
} from '@chakra-ui/react';
import { API_BASE_URL } from '../api/api'; // Import API_BASE_URL from your api.js

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state for button
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast(); // Initialize useToast hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Set loading to true on submission
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        // Improved error message handling
        throw new Error(errorData.non_field_errors?.[0] || 'Invalid username or password.');
      }

      const data = await response.json();
      login(data.auth_token);
      toast({ // Show success toast
        title: "Login Successful",
        description: "You have been logged in.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Redirect to home (dashboard) page after login
    } catch (err) {
      setError(err.message);
      toast({ // Show error toast
        title: "Login Failed",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Always set loading to false
    }
  };

  return (
    <Box p={8} maxW="md" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Login
      </Heading>
      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            isLoading={loading} // Use loading state
            isDisabled={loading} // Disable button while loading
            width="full"
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}