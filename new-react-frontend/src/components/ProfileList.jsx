// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\ProfileList.jsx

import React, { useEffect, useState, useCallback } from "react"; // Add useCallback
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchProfiles, deleteProfile } from "../api/api"; // Ensure deleteProfile is imported if you uncomment its usage

import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  CardFooter,
  Button,
  useToast,
} from "@chakra-ui/react";

export default function ProfileList() {
  const { isAuthenticated, authToken } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Wrap loadProfiles in useCallback
  const loadProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchProfiles();
      setProfiles(data);
    } catch (err) {
      console.error("Error fetching profiles:", err);
      setError("Failed to load profiles.");
      toast({
        title: "Error",
        description: "Failed to load profiles.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // Dependencies for loadProfiles. `toast` is stable.

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isAuthenticated && authToken) {
      loadProfiles();
    }
  }, [isAuthenticated, authToken, navigate, loadProfiles]); // Add loadProfiles to dependency array

  // ... (rest of the component remains the same)
  // handleDelete is fine as it doesn't seem to be in a useEffect dependency array itself,
  // but if you uncomment it, consider wrapping it in useCallback too.

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this profile?")) {
      try {
        await deleteProfile(id); // Make sure deleteProfile is exported from api.js
        toast({
          title: "Profile Deleted",
          description: "Profile has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        loadProfiles(); // Reload profiles after deletion
      } catch (err) {
        console.error("Error deleting profile:", err);
        toast({
          title: "Error",
          description: "Failed to delete profile.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading profiles...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" mt={5}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p={8} maxW="container.xl" mx="auto" mt={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h2" size="xl" textAlign="center">
          Profiles
        </Heading>
        {profiles.length === 0 ? (
          <Text textAlign="center" fontSize="lg">
            No profiles found.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {profiles.map((profile) => (
              <Card key={profile.id}>
                <CardBody>
                  <Heading size="md">{profile.name}</Heading>
                  <Text mt={2}>Bio: {profile.bio}</Text>
                  <Text>Contact: {profile.contact_info}</Text>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate(`/profiles/${profile.id}`)}
                    mr={2}
                  >
                    View Details
                  </Button>
                  <Button
                    colorScheme="orange"
                    onClick={() => navigate(`/profiles/edit/${profile.id}`)}
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(profile.id)} // Uncommented for demonstration
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        )}
        <Button
          colorScheme="teal"
          onClick={() => navigate("/profiles/new")}
          mt={4}
        >
          Add New Profile
        </Button>
      </VStack>
    </Box>
  );
}
