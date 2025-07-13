// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\api\api.js

import axios from 'axios';

// *** IMPORTANT: Set this to your ACTUAL Django backend URL ***
// Based on previous screenshots, your Render backend is 'pathforge-backend.onrender.com'
export const API_BASE_URL = 'https://pathforge-backend.onrender.com/api'; 
// If you are running Django locally, use: 'http://127.0.0.1:8000/api';

// --- Authentication ---
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/token/`, { username, password });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// --- Profiles ---
export const getProfiles = async (authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profiles:", error.response?.data || error.message);
    throw error;
  }
};

export const getProfileById = async (id, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/${id}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createProfile = async (profileData, authToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/profiles/`, profileData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating profile:", error.response?.data || error.message);
    throw error;
  }
};

export const updateProfile = async (id, profileData, authToken) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/profiles/${id}/`, profileData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating profile ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteProfile = async (id, authToken) => {
  try {
    await axios.delete(`${API_BASE_URL}/profiles/${id}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting profile ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// --- Skills ---
export const getSkills = async (authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/skills/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error.response?.data || error.message);
    throw error;
  }
};

export const getSkillById = async (id, authToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/skills/${id}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching skill ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const createSkill = async (skillData, authToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/skills/`, skillData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating skill:", error.response?.data || error.message);
    throw error;
  }
};

export const updateSkill = async (id, skillData, authToken) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/skills/${id}/`, skillData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating skill ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

export const deleteSkill = async (id, authToken) => {
  try {
    await axios.delete(`${API_BASE_URL}/skills/${id}/`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting skill ${id}:`, error.response?.data || error.message);
    throw error;
  }
};