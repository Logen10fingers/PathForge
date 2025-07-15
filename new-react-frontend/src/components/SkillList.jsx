// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\SkillList.jsx

import React, { useEffect, useState, useCallback } from "react"; // Add useCallback
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchSkills, deleteSkill } from "../api/api";

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

export default function SkillList() {
  const { isAuthenticated, authToken } = useAuth();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  // Wrap loadSkills in useCallback
  const loadSkills = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchSkills();
      setSkills(data);
    } catch (err) {
      console.error("Error fetching skills:", err);
      setError("Failed to load skills.");
      toast({
        title: "Error",
        description: "Failed to load skills.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]); // Dependencies for loadSkills. `toast` is stable.

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (isAuthenticated && authToken) {
      loadSkills();
    }
  }, [isAuthenticated, authToken, navigate, loadSkills]); // Add loadSkills to dependency array

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id);
        toast({
          title: "Skill Deleted",
          description: "Skill has been successfully deleted.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        loadSkills(); // Reload skills after deletion
      } catch (err) {
        console.error("Error deleting skill:", err);
        toast({
          title: "Error",
          description: "Failed to delete skill.",
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
        <Text mt={4}>Loading skills...</Text>
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
          Skills
        </Heading>
        {skills.length === 0 ? (
          <Text textAlign="center" fontSize="lg">
            No skills found.
          </Text>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {skills.map((skill) => (
              <Card key={skill.id}>
                <CardBody>
                  <Heading size="md">{skill.name}</Heading>
                  <Text mt={2}>Description: {skill.description}</Text>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="blue"
                    onClick={() => navigate(`/skills/${skill.id}`)}
                    mr={2}
                  >
                    View Details
                  </Button>
                  <Button
                    colorScheme="orange"
                    onClick={() => navigate(`/skills/edit/${skill.id}`)}
                    mr={2}
                  >
                    Edit
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDelete(skill.id)}
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
          onClick={() => navigate("/skills/new")}
          mt={4}
        >
          Add New Skill
        </Button>
      </VStack>
    </Box>
  );
}
