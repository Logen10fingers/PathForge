// new-react-frontend/src/components/SkillDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Spinner } from '@chakra-ui/react';
import { fetchSkillById } from '../api/api';

const SkillDetail = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchSkillById(id)
      .then((data) => {
        console.log("Fetched skill:", data); // Log fetched data for debugging
        setSkill(data);
        setLoading(false);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Failed to fetch skill:", err);
        setError(err.message); // Set the error message
        setLoading(false); // Stop loading regardless of success or failure
        setSkill(null); // Ensure skill is null on error
      });
  }, [id]); // Dependency array: re-run effect if 'id' changes

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" thickness="4px" color="teal.500" /> {/* Consistent spinner styling */}
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={6}>
        <Text color="red.500">Error loading skill: {error}</Text>
      </Box>
    );
  }

  if (!skill) {
    return (
      <Box p={6}>
        <Text color="orange.500">Skill not found.</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Heading mb={4}>{skill.name}</Heading>
      <Text><strong>Category:</strong> {skill.category || 'N/A'}</Text>
      <Text><strong>Description:</strong> {skill.description || 'N/A'}</Text>
      <Text><strong>Source:</strong> {skill.source || 'N/A'}</Text>
      {/* Assuming aliases might be an array, display them */} 
      {skill.aliases && Array.isArray(skill.aliases) && skill.aliases.length > 0 && (
        <Text><strong>Aliases:</strong> {skill.aliases.join(', ')}</Text>
      )}
      <Text><strong>Last Updated:</strong> {new Date(skill.last_updated).toLocaleString()}</Text>
      {/* Add other fields as necessary based on your Skill model and serializer */}
    </Box>
  );
};

export default SkillDetail;
