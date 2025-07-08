// new-react-frontend/src/components/ProfileDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Stack, Spinner } from '@chakra-ui/react';

const ProfileDetail = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // FIX: Explicitly use the Django backend URL
    const apiUrl = `http://localhost:8000/api/profiles/${id}/`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          // If response is not OK (e.g., 404, 500), throw an error
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched profile:", data); // Check console for the fetched data
        setProfile(data);
        setLoading(false);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        setError(err.message); // Set the error message
        setLoading(false); // Stop loading regardless of success or failure
        setProfile(null); // Ensure profile is null on error
      });
  }, [id]); // Dependency array: re-run effect if 'id' changes

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" thickness="4px" color="blue.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6}>
        <Text color="red.500">Error loading profile: {error}</Text>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box p={6}>
        <Text color="orange.500">Profile not found.</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Heading mb={4}>{profile.user?.username || 'Unknown User'}</Heading>
      <Stack spacing={3}> {/* Increased spacing for better readability */}
        <Text><strong>Bio:</strong> {profile.bio || 'N/A'}</Text>
        <Text><strong>Source:</strong> {profile.source || 'N/A'}</Text>
        <Text><strong>Last Updated:</strong> {new Date(profile.last_updated).toLocaleString()}</Text>
        <Text>
          <strong>Skills:</strong>{' '}
          {profile.skills && Array.isArray(profile.skills) && profile.skills.length > 0
            ? profile.skills.map((s) => s.name || s).join(', ')
            : 'None listed'}
        </Text>
      </Stack>
    </Box>
  );
};

export default ProfileDetail;