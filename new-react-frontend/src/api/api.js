// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\api\api.js

import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Make sure this matches your Django backend URL

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to attach the token to outgoing requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor for response handling (e.g., unauthorized errors)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized request. Token might be expired or invalid.");
            // Optional: You could redirect to login page here, but typically handled by useAuth hook or similar.
            // For example: window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const loginUser = async (username, password) => {
    try {
        const response = await api.post('/api/token/login/', { username, password });
        return response.data;
    } catch (error) {
        console.error('Login API error:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Profile related API calls
export const fetchProfiles = async () => { // Exported as fetchProfiles
    try {
        const response = await api.get('/api/profiles/');
        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchProfileById = async (id) => {
    try {
        const response = await api.get(`/api/profiles/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching profile with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createProfile = async (profileData) => { // Exported as createProfile
    try {
        const response = await api.post('/api/profiles/', profileData);
        return response.data;
    } catch (error) {
        console.error('Error creating profile:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateProfile = async (id, profileData) => {
    try {
        const response = await api.put(`/api/profiles/${id}/`, profileData);
        return response.data;
    } catch (error) {
        console.error(`Error updating profile with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteProfile = async (id) => {
    try {
        const response = await api.delete(`/api/profiles/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting profile with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};


// Skill related API calls
export const fetchSkills = async () => { // Exported as fetchSkills
    try {
        const response = await api.get('/api/skills/');
        return response.data;
    } catch (error) {
        console.error('Error fetching skills:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchSkillById = async (id) => {
    try {
        const response = await api.get(`/api/skills/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching skill with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const createSkill = async (skillData) => { // Exported as createSkill
    try {
        const response = await api.post('/api/skills/', skillData);
        return response.data;
    } catch (error) {
        console.error('Error creating skill:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const updateSkill = async (id, skillData) => {
    try {
        const response = await api.put(`/api/skills/${id}/`, skillData);
        return response.data;
    } catch (error) {
        console.error(`Error updating skill with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

export const deleteSkill = async (id) => { // Exported as deleteSkill
    try {
        const response = await api.delete(`/api/skills/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting skill with ID ${id}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};