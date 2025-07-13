import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getProfileById, createProfile, updateProfile } from "../api/api";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  Spinner,
  Text,
  useToast
} from '@chakra-ui/react';

export default function ProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [profileData, setProfileData] = useState({
    bio: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (id) {
      const fetchProfile = async () => {
        try {
          const data = await getProfileById(id);
          setProfileData({
            bio: data.bio || '',
          });
        } catch (err) {
          console.error("Error fetching profile:", err);
          setError("Failed to load profile. Please try again.");
          toast({
            title: "Error",
            description: "Failed to load profile data.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [id, isAuthenticated, navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!isAuthenticated) {
      setError("You must be logged in to save a profile.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (id) {
        await updateProfile(id, profileData);
        toast({
          title: "Profile updated.",
          description: "Your profile has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createProfile(profileData);
        toast({
          title: "Profile created.",
          description: "Your new profile has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate('/profiles');
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(`Failed to save profile: ${err.message || 'Unknown error'}`);
      toast({
        title: "Error saving profile.",
        description: err.message || "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading profile data...</Text>
      </Box>
    );
  }

  if (error && !isSubmitting) {
    return (
      <Alert status="error" mt={5}>
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box p={8} maxW="md" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" mb={6} textAlign="center">
        {id ? 'Edit Profile' : 'Create New Profile'}
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="bio" isRequired>
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
            />
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            width="full"
          >
            {id ? 'Update Profile' : 'Create Profile'}
          </Button>
          <Button mt={2} width="full" onClick={() => navigate('/profiles')}>
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
