// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\SkillList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSkills, deleteSkill } from '../api/api'; // Ensure correct path for API functions
import { useAuth } from '../hooks/useAuth'; // Import useAuth hook

const SkillList = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login'); // Redirect if not authenticated
            return;
        }

        const fetchSkills = async () => {
            try {
                setLoading(true);
                const data = await getSkills();
                setSkills(data);
            } catch (err) {
                console.error("Error fetching skills:", err);
                setError("Failed to load skills. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, [isAuthenticated, navigate]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this skill?')) {
            try {
                setLoading(true);
                await deleteSkill(id);
                setSkills(skills.filter((skill) => skill.id !== id));
            } catch (err) {
                console.error("Error deleting skill:", err);
                setError("Failed to delete skill.");
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div>Loading skills...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h2>Skills List</h2>
            <button onClick={() => navigate('/skills/create')} style={{ marginBottom: '1rem' }}>
                Add New Skill
            </button>
            {skills.length === 0 ? (
                <p>No skills found. Click "Add New Skill" to create one.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Category</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map((skill) => (
                            <tr key={skill.id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{skill.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{skill.description}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{skill.category}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button onClick={() => navigate(`/skills/${skill.id}`)} style={{ marginRight: '0.5rem' }}>View</button>
                                    <button onClick={() => navigate(`/skills/edit/${skill.id}`)} style={{ marginRight: '0.5rem' }}>Edit</button>
                                    <button onClick={() => handleDelete(skill.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SkillList;