// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\Dashboard.jsx

import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
// CORRECTED: Import fetchProfiles and fetchSkills (as exported from api.js)
import { fetchProfiles, fetchSkills } from "../api/api";
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Spinner,
  Alert,
  AlertIcon,
  Button, // Added Button import for quick actions
} from "@chakra-ui/react";

export default function Dashboard() {
  const { isAuthenticated, user, authToken } = useAuth();
  const [profilesCount, setProfilesCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!isAuthenticated || !authToken) {
        setLoading(false);
        setError("Please log in to view dashboard data.");
        return;
      }

      try {
        setLoading(true);
        const profilesData = await fetchProfiles();
        setProfilesCount(profilesData.length);

        const skillsData = await fetchSkills();
        setSkillsCount(skillsData.length);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(
          "Failed to load dashboard data. Ensure backend is running and you are logged in."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [isAuthenticated, authToken]);

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading dashboard data...</Text>
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
          Welcome, {user ? user.username : "Guest"}!
        </Heading>
        <Text fontSize="lg" textAlign="center">
          This is your personalized dashboard.
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Profiles</StatLabel>
                <StatNumber>{profilesCount}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  You're building your network!
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Total Skills</StatLabel>
                <StatNumber>{skillsCount}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Enhancing your capabilities!
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* Add more dashboard cards as needed */}
          <Card>
            <CardBody>
              <Stat>
                <StatLabel>Upcoming Events</StatLabel>
                <StatNumber>0</StatNumber>
                <StatHelpText>
                  <StatArrow type="decrease" />
                  Nothing planned yet.
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        <Box>
          <Heading as="h3" size="lg" mt={10} mb={4}>
            Quick Actions
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
            <Button
              colorScheme="teal"
              onClick={() => console.log("Add new profile")}
            >
              Add New Profile
            </Button>
            <Button
              colorScheme="purple"
              onClick={() => console.log("Add new skill")}
            >
              Add New Skill
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => console.log("View reports")}
            >
              View Reports
            </Button>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}
