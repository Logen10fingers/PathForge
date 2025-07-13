// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook
import { getProfiles, getSkills } from '../api/api'; // Assuming these functions exist in api/api.js

// If you are using Chakra UI, ensure these imports are present.
// If not, you might need to adjust the JSX below to use standard HTML elements.
import {
    Box,
    Heading,
    Text,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Card,
    CardHeader,
    CardBody,
    Spinner,
    Alert,
    AlertIcon,
    VStack,
    Button
} from '@chakra-ui/react';

export default function Dashboard() {
    const { isAuthenticated, user } = useAuth(); // Get auth state and user info
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalProfiles: 0,
        totalSkills: 0,
        // Add more stats as needed, e.g., profilesAddedToday, skillsAddedThisMonth
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect to login if not authenticated
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch profiles and skills to get counts
                const profilesData = await getProfiles();
                const skillsData = await getSkills();

                setStats({
                    totalProfiles: profilesData.length,
                    totalSkills: skillsData.length,
                });
            } catch (err) {
                console.error("Error fetching dashboard data:", err);
                setError("Failed to load dashboard data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated, navigate]);

    if (loading) {
        return (
            <Box textAlign="center" mt={10}>
                <Spinner size="xl" />
                <Text mt={4}>Loading dashboard...</Text>
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
                    Welcome, {user ? user.username : 'Guest'}!
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    <Card>
                        <CardHeader>
                            <Heading size="md">Total Profiles</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stat>
                                <StatLabel>Number of Profiles</StatLabel>
                                <StatNumber>{stats.totalProfiles}</StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Since last check
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Heading size="md">Total Skills</Heading>
                        </CardHeader>
                        <CardBody>
                            <Stat>
                                <StatLabel>Number of Skills</StatLabel>
                                <StatNumber>{stats.totalSkills}</StatNumber>
                                <StatHelpText>
                                    <StatArrow type="increase" />
                                    Since last check
                                </StatHelpText>
                            </Stat>
                        </CardBody>
                    </Card>

                    {/* You can add more stat cards here */}
                    <Card>
                        <CardHeader>
                            <Heading size="md">Quick Actions</Heading>
                        </CardHeader>
                        <CardBody>
                            <VStack spacing={3}>
                                <Button colorScheme="blue" width="full" onClick={() => navigate('/profiles/create')}>
                                    Create New Profile
                                </Button>
                                <Button colorScheme="green" width="full" onClick={() => navigate('/skills/create')}>
                                    Add New Skill
                                </Button>
                                <Button colorScheme="purple" width="full" onClick={() => navigate('/profiles')}>
                                    View All Profiles
                                </Button>
                                <Button colorScheme="orange" width="full" onClick={() => navigate('/skills')}>
                                    View All Skills
                                </Button>
                            </VStack>
                        </CardBody>
                    </Card>
                </SimpleGrid>

                {/* Add other dashboard components or summaries here */}
            </VStack>
        </Box>
    );
}