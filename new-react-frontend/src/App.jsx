import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  List,
  ListItem,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Icon,
  Select,
} from '@chakra-ui/react';
import { FaUser, FaStar, FaLightbulb } from 'react-icons/fa';
// Import Link for routing
import { Link } from 'react-router-dom';
import DataImport from './components/DataImport';

function App() {
  const [skills, setSkills] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [skillInput, setSkillInput] = useState('');
  const [suggestedCategory, setSuggestedCategory] = useState(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionError, setSuggestionError] = useState(null);

  // State variables for filtering
  const [skillSearch, setSkillSearch] = useState('');
  const [profileSearch, setProfileSearch] = useState('');
  const [skillCategoryFilter, setSkillCategoryFilter] = useState('');

  const containerBg = useColorModeValue('#f9fafb', '#1a202c');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headerColor = useColorModeValue('gray.700', 'gray.200');

  useEffect(() => {
    async function fetchData() {
      try {
        const skillsResponse = await fetch('http://127.0.0.1:8000/api/skills/');
        if (!skillsResponse.ok) throw new Error(`HTTP error! status: ${skillsResponse.status}`);
        const skillsData = await skillsResponse.json();
        setSkills(Array.isArray(skillsData) ? skillsData : []);

        const profilesResponse = await fetch('http://127.0.0.1:8000/api/profiles/');
        if (!profilesResponse.ok) throw new Error(`HTTP error! status: ${profilesResponse.status}`);
        const profilesData = await profilesResponse.json();
        setProfiles(Array.isArray(profilesData) ? profilesData : []);
      } catch (e) {
        console.error('Failed to fetch data:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSuggestCategory = async () => {
    setSuggestionLoading(true);
    setSuggestionError(null);
    setSuggestedCategory(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/ai-skills/suggest-category/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skill_text: skillInput }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setSuggestedCategory(data.suggested_category);
    } catch (e) {
      setSuggestionError(e.message);
    } finally {
      setSuggestionLoading(false);
    }
  };

  // Filtering logic
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(skillSearch.toLowerCase());
    const matchesCategory = skillCategoryFilter ? skill.category === skillCategoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const filteredProfiles = profiles.filter(profile => {
    // Check if profile.user and profile.user.username exist before accessing
    const username = profile.user && profile.user.username ? profile.user.username : '';
    return username.toLowerCase().includes(profileSearch.toLowerCase());
  });

  if (loading) {
    return (
      <Container centerContent height="100vh" display="flex" flexDirection="column" justifyContent="center">
        <Spinner size="xl" color="teal.500" />
        <Text mt={4} fontSize="xl">Loading dashboard data...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" p={8}>
        <Alert status="error" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" py={4}>
          <AlertIcon boxSize="40px" mr={0} />
          <Heading as="h3" size="md" mt={2}>Error Loading Data</Heading>
          <Text>{error}</Text>
          <Text fontSize="sm" mt={2}>Please ensure your Django backend is running and accessible at http://127.0.0.1:8000/.</Text>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="100vw" width="100%" height="100vh" py={10} bg={containerBg} borderRadius="md">
      <VStack spacing={10} align="stretch">
        <Heading as="h1" size="2xl" mb={4} textAlign="center" color={headerColor}>
          PathForge Dashboard (React + Chakra UI)
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} p={6}>
          {/* Skill Box */}
          <Box
            p={6}
            bg={cardBg}
            borderRadius="lg"
            shadow="md"
            border="1px"
            borderColor={borderColor}
            transition="all 0.3s ease-in-out"
            _hover={{ shadow: 'lg', transform: 'scale(1.01)' }}
          >
            <Heading as="h2" size="lg" mb={4} color={headerColor}>Skills</Heading>
            <Input
              placeholder="Search skills..."
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              mb={4}
            />
            <Select
              placeholder="Filter by category"
              value={skillCategoryFilter}
              onChange={(e) => setSkillCategoryFilter(e.target.value)}
              mb={4}
            >
              <option value="Development">Development</option>
              <option value="Frontend">Frontend</option>
              <option value="Web">Web</option>
              <option value="Database">Database</option>
              {/* Add more categories as needed, or dynamically populate from skills data */}
            </Select>
            {!Array.isArray(filteredSkills) || filteredSkills.length === 0 ? (
              <Text>No skills found matching your criteria. Add some in Django admin or adjust filters.</Text>
            ) : (
              <List spacing={3}>
                {filteredSkills.map((skill) => (
                  <ListItem key={skill.id}>
                    {/* Link for Skill Detail View */}
                    <Link to={`/skills/${skill.id}`}>
                      <Text as="span" fontWeight="bold" color="teal.500" _hover={{ textDecoration: 'underline' }}>
                        {skill.name}
                      </Text>
                    </Link>
                    {' '} - {skill.description} (Category: {skill.category || 'N/A'})
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Profile Box */}
          <Box
            p={6}
            bg={cardBg}
            borderRadius="lg"
            shadow="md"
            border="1px"
            borderColor={borderColor}
            transition="all 0.3s ease-in-out"
            _hover={{ shadow: 'lg', transform: 'scale(1.01)' }}
          >
            <Heading as="h2" size="lg" mb={4} color={headerColor}>Profiles</Heading>
            <Input
              placeholder="Search profiles..."
              value={profileSearch}
              onChange={(e) => setProfileSearch(e.target.value)}
              mb={4}
            />
            {!Array.isArray(filteredProfiles) || filteredProfiles.length === 0 ? (
              <Text>No profiles found matching your criteria. Add some in Django admin or adjust filters.</Text>
            ) : (
              <List spacing={3}>
                {filteredProfiles.map((profile) => (
                  <ListItem key={profile.id} p={2} shadow="sm" borderWidth="1px" borderRadius="md">
                    {/* Link for Profile Detail View */}
                    <Link to={`/profiles/${profile.id}`}>
                      <Heading fontSize="md" color="blue.500" _hover={{ textDecoration: 'underline' }}>
                        {profile.user ? profile.user.username : 'N/A User'}
                      </Heading>
                    </Link>
                    <Text fontSize="sm">Bio: {profile.bio || 'N/A'}</Text>
                    {/* Removed 'Title' as it's not consistently in data, using bio instead */}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Suggest Skill Category Box */}
          <Box
            p={6}
            bg={cardBg}
            borderRadius="lg"
            shadow="md"
            border="1px"
            borderColor={borderColor}
            transition="all 0.3s ease-in-out"
            _hover={{ shadow: 'lg', transform: 'scale(1.01)' }}
          >
            <Heading as="h2" size="lg" mb={4} color={headerColor}>Suggest Skill Category (AI Powered)</Heading>
            <FormControl id="skill-suggestion">
              <FormLabel>Enter a skill name</FormLabel>
              <Input
                placeholder="e.g., Python"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                size="md"
                focusBorderColor="teal.400"
              />
              <FormHelperText mb={3}>Type a skill name and get an AI-powered category suggestion.</FormHelperText>
              <Button
                colorScheme="teal"
                onClick={handleSuggestCategory}
                isDisabled={!skillInput.trim() || suggestionLoading}
                mt={2}
                isLoading={suggestionLoading}
              >
                Suggest Category
              </Button>
              {suggestionError && <Text color="red.500" mt={2}>Error: {suggestionError}</Text>}
              {suggestedCategory && <Text mt={2}>Suggested Category: <strong>{suggestedCategory}</strong></Text>}
            </FormControl>
          </Box>

          {/* Import Data File Box */}
          <Box
            p={6}
            bg={cardBg}
            borderRadius="lg"
            shadow="md"
            border="1px"
            borderColor={borderColor}
            transition="all 0.3s ease-in-out"
            _hover={{ shadow: 'lg', transform: 'scale(1.01)' }}
          >
            <Heading as="h2" size="lg" mb={4} color={headerColor}>Import Data File</Heading>
            <DataImport />
          </Box>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default App;