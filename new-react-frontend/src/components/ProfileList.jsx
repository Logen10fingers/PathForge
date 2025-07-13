// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\ProfileList.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming useAuth is in ../hooks
import { getProfiles } from '../api/api'; // Import getProfiles from your API file

// If you are using Chakra UI, ensure these imports are present.
// If not, you might need to adjust the JSX below to use standard HTML elements.
import {
    Box,
    Heading,
    Text,
    Button,
    VStack,
    Spinner,
    Alert,
    AlertIcon,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Flex,
    Spacer
} from '@chakra-ui/react';

export default function ProfileList() {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect if not authenticated
            return;
        }

        const fetchProfiles = async () => {
            try {
                setLoading(true);
                const data = await getProfiles();
                setProfiles(data);
            } catch (err) {
                console.error("Error fetching profiles:", err);
                setError("Failed to load profiles. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfiles();
    }, [isAuthenticated, navigate]);

    const handleViewProfile = (profileId) => {
        navigate(`/profiles/${profileId}`);
    };

    const handleEditProfile = (profileId) => {
        navigate(`/profiles/edit/${profileId}`);
    };

    const handleCreateProfile = () => {
        navigate('/profiles/create');
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
            <Flex mb={6} alignItems="center">
                <Heading as="h2" size="xl">Profiles</Heading>
                <Spacer />
                {isAuthenticated && (
                    <Button colorScheme="teal" onClick={handleCreateProfile}>
                        Create New Profile
                    </Button>
                )}
            </Flex>

            {profiles.length === 0 ? (
                <Text>No profiles found. {isAuthenticated && "Click 'Create New Profile' to add one."}</Text>
            ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {profiles.map((profile) => (
                        <Card key={profile.id} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
                            <CardHeader>
                                <Heading size="md">{profile.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>{profile.bio}</Text>
                                {/* Add more profile details if needed */}
                            </CardBody>
                            <CardFooter>
                                <Button size="sm" onClick={() => handleViewProfile(profile.id)}>
                                    View
                                </Button>
                                {/* Only show edit button if authenticated and it's the user's profile, or if there's a more general edit permission */}
                                {isAuthenticated && ( // You might want more granular checks here
                                    <Button size="sm" ml={2} onClick={() => handleEditProfile(profile.id)}>
                                        Edit
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
}