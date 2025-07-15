// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\ProfileForm.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// Ensure createProfile, updateProfile, and fetchProfileById are imported correctly
import { createProfile, updateProfile, fetchProfileById } from "../api/api";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  VStack,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  Text,
} from "@chakra-ui/react";

export default function ProfileForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    contact_info: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadProfile = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const profile = await fetchProfileById(id);
          setFormData({
            name: profile.name,
            bio: profile.bio,
            contact_info: profile.contact_info,
          });
        } catch (err) {
          console.error("Error fetching profile for edit:", err);
          setError("Failed to load profile for editing.");
          toast({
            title: "Error",
            description: "Failed to load profile.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadProfile();
  }, [id, isEditMode, isAuthenticated, navigate, toast]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isEditMode) {
        await updateProfile(id, formData);
        toast({
          title: "Profile Updated",
          description: "Profile has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createProfile(formData);
        toast({
          title: "Profile Created",
          description: "New profile has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/profiles");
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(`Failed to ${isEditMode ? "update" : "create"} profile.`);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? "update" : "create"} profile.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading form...</Text>
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
    <Box
      p={8}
      maxW="md"
      mx="auto"
      mt={10}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        {isEditMode ? "Edit Profile" : "Create New Profile"}
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter profile name"
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter short bio"
            />
          </FormControl>
          <FormControl id="contact_info">
            <FormLabel>Contact Info</FormLabel>
            <Input
              type="text"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Enter contact details (email, phone, etc.)"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            width="full"
            mt={4}
            isLoading={loading}
          >
            {isEditMode ? "Update Profile" : "Create Profile"}
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => navigate("/profiles")}
            width="full"
          >
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
