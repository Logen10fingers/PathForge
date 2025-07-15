// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\Login.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../api/api"; // Correct import: ONLY loginUser is needed here

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); // Get the login function from AuthContext via useAuth
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Show loading state

    try {
      // Call the loginUser API function
      const data = await loginUser(username, password);

      // Check if data and data.token exist in the response
      if (data && data.token) {
        login(data.token); // Pass the token to the login function from AuthContext
        navigate("/dashboard"); // Redirect to dashboard on successful login
      } else {
        // If loginUser succeeded but didn't return a token as expected
        setError("Login failed: Server did not return a token.");
      }
    } catch (err) {
      console.error("Login attempt failed:", err);
      // Enhanced error handling for user feedback
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (e.g., 400, 401, 404, 500)
        console.error("Error response data:", err.response.data);
        if (err.response.status === 400 || err.response.status === 401) {
          setError(
            err.response.data.non_field_errors ||
              err.response.data.detail ||
              "Invalid username or password."
          );
        } else if (err.response.status === 404) {
          setError(
            "Login endpoint not found. Please check backend URL and routing."
          );
        } else {
          setError(
            `Server error: ${err.response.status} - ${err.response.statusText}`
          );
        }
      } else if (err.request) {
        // The request was made but no response was received (e.g., network down, CORS blocked)
        setError(
          "Network error: No response from server. Check if backend is running and accessible (and CORS is configured)."
        );
      } else {
        // Something else happened while setting up the request
        setError(`An unexpected error occurred during login: ${err.message}`);
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <Box
      p={8}
      maxW="md"
      mx="auto"
      mt={10}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </FormControl>

          {error && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Button
            colorScheme="teal"
            type="submit"
            width="full"
            isLoading={loading}
            loadingText="Logging in..."
          >
            Login
          </Button>
        </VStack>
      </form>
      <Text mt={4} textAlign="center">
        Don't have an account?{" "}
        <Button variant="link" onClick={() => navigate("/register")}>
          Register
        </Button>
      </Text>
    </Box>
  );
}
