// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\SkillForm.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// Ensure createSkill, updateSkill, and fetchSkillById are imported correctly
import { createSkill, updateSkill, fetchSkillById } from "../api/api";

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

export default function SkillForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isEditMode = !!id;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadSkill = async () => {
      if (isEditMode) {
        try {
          setLoading(true);
          const skill = await fetchSkillById(id);
          setFormData({
            name: skill.name,
            description: skill.description,
          });
        } catch (err) {
          console.error("Error fetching skill for edit:", err);
          setError("Failed to load skill for editing.");
          toast({
            title: "Error",
            description: "Failed to load skill.",
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

    loadSkill();
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
        await updateSkill(id, formData);
        toast({
          title: "Skill Updated",
          description: "Skill has been successfully updated.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        await createSkill(formData);
        toast({
          title: "Skill Created",
          description: "New skill has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
      navigate("/skills");
    } catch (err) {
      console.error("Error saving skill:", err);
      setError(`Failed to ${isEditMode ? "update" : "create"} skill.`);
      toast({
        title: "Error",
        description: `Failed to ${isEditMode ? "update" : "create"} skill.`,
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
        {isEditMode ? "Edit Skill" : "Create New Skill"}
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
              placeholder="Enter skill name"
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter skill description"
            />
          </FormControl>
          <Button
            colorScheme="blue"
            type="submit"
            width="full"
            mt={4}
            isLoading={loading}
          >
            {isEditMode ? "Update Skill" : "Create Skill"}
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => navigate("/skills")}
            width="full"
          >
            Cancel
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
