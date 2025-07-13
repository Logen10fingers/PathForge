// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\SkillForm.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook for authentication
import { getSkillById, createSkill, updateSkill } from '../api/api'; // Ensure correct path for API functions. Assuming api.js in the api folder.

const SkillForm = () => {
    const { id } = useParams(); // Get ID from URL for editing
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Use the authentication context

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '', // Example: if your skill has a category field
        aliases: '' // Example: if your skill has an aliases field (often handled as a string of comma-separated values for simplicity in forms)
    });
    const [loading, setLoading] = useState(true); // Set to true initially if fetching data
    const [error, setError] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect if not authenticated
            return;
        }

        if (id) {
            setIsEditMode(true);
            const fetchSkill = async () => {
                try {
                    setLoading(true);
                    // Use getSkillById which you should have in your api/api.js
                    // If getSkillById is not implemented, you MUST implement it,
                    // or adapt to fetch all skills and find by ID (less efficient but works for now).
                    const skillToEdit = await getSkillById(id);
                    
                    if (skillToEdit) {
                        setFormData({
                            name: skillToEdit.name || '',
                            description: skillToEdit.description || '',
                            category: skillToEdit.category || '',
                            aliases: Array.isArray(skillToEdit.aliases) ? skillToEdit.aliases.join(', ') : skillToEdit.aliases || '',
                        });
                    } else {
                        setError("Skill not found.");
                    }
                } catch (err) {
                    console.error("Error fetching skill for edit:", err);
                    setError("Failed to load skill for editing.");
                } finally {
                    setLoading(false);
                }
            };
            fetchSkill();
        } else {
            setIsEditMode(false);
            // Reset form for new skill creation
            setFormData({
                name: '',
                description: '',
                category: '',
                aliases: '',
            });
            setLoading(false); // No data to load for new skill
        }
    }, [id, isAuthenticated, navigate]); // Added isAuthenticated and navigate to dependencies

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

        if (!isAuthenticated) {
            setError("You must be logged in to save a skill.");
            setLoading(false);
            return;
        }

        // Basic validation
        if (!formData.name.trim()) {
            setError("Skill name is required.");
            setLoading(false);
            return;
        }
        
        try {
            const dataToSubmit = { ...formData };
            // Convert aliases string to array if your backend expects an array
            if (dataToSubmit.aliases && typeof dataToSubmit.aliases === 'string') {
                dataToSubmit.aliases = dataToSubmit.aliases.split(',').map(item => item.trim()).filter(item => item !== '');
            } else {
                dataToSubmit.aliases = [];
            }

            if (isEditMode) {
                await updateSkill(id, dataToSubmit);
            } else {
                await createSkill(dataToSubmit);
            }
            navigate('/skills'); // Redirect to skills list on success
        } catch (err) {
            console.error("Error saving skill:", err);
            setError(`Failed to save skill: ${err.message || 'An unexpected error occurred'}`);
        } finally {
            setLoading(false);
        }
    };

    // Adjusted loading and error messages for better user experience
    if (loading && id) return <div>Loading skill data...</div>; // Only show loading when fetching existing skill
    if (error && !loading) return <div style={{ color: 'red' }}>Error: {error}</div>; // Show error only if not loading and error exists

    return (
        <div>
            <h2>{isEditMode ? 'Edit Skill' : 'Add New Skill'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="aliases">Aliases (comma-separated):</label>
                    <input
                        type="text"
                        id="aliases"
                        name="aliases"
                        value={formData.aliases}
                        onChange={handleChange}
                        placeholder="e.g., Python, Py"
                    />
                </div>
                {/* Add more form fields for other skill attributes as needed */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : isEditMode ? 'Update Skill' : 'Create Skill'}
                </button>
                <button type="button" onClick={() => navigate('/skills')} disabled={loading}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default SkillForm;