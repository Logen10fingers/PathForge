// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\App.jsx

import React from 'react';
// Import Routes and Route from react-router-dom, but NOT BrowserRouter
import { Routes, Route, Navigate } from 'react-router-dom';

// Import your components
import { PrivateRoute } from './components/PrivateRoute'; // Your PrivateRoute component
import Login from './components/Login'; // Your Login component
import Navbar from './components/Navbar'; // Your Navbar component
import Dashboard from './components/Dashboard'; // Your Dashboard component

// CRUD Components (ensure these paths are correct based on your folder structure)
import SkillList from './components/SkillList';
import SkillForm from './components/SkillForm';
import ProfileList from './components/ProfileList';
import ProfileForm from './components/ProfileForm';

// Detail Components (if they exist in your components folder)
import SkillDetail from './components/SkillDetail';
import ProfileDetail from './components/ProfileDetail';

// Other standalone components
import DataImport from './components/DataImport'; // Assuming DataImport.jsx exists

function App() {
    return (
        <> {/* Use a React Fragment to wrap Navbar and Routes */}
            <Navbar /> {/* Your navigation bar, rendered on all pages */}
            <Routes>
                {/* Public route for login */}
                <Route path="/login" element={<Login />} />

                {/* Main Dashboard - Protected as it fetches authenticated data */}
                {/* This will render your existing dashboard content */}
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

                {/* Protected routes for Skills CRUD */}
                <Route path="/skills" element={<PrivateRoute><SkillList /></PrivateRoute>} />
                <Route path="/skills/new" element={<PrivateRoute><SkillForm /></PrivateRoute>} />
                <Route path="/skills/:id/edit" element={<PrivateRoute><SkillForm /></PrivateRoute>} />
                {/* Optional: Skill Detail Page */}
                <Route path="/skills/:id" element={<PrivateRoute><SkillDetail /></PrivateRoute>} />


                {/* Protected routes for Profiles CRUD */}
                <Route path="/profiles" element={<PrivateRoute><ProfileList /></PrivateRoute>} />
                <Route path="/profiles/new" element={<PrivateRoute><ProfileForm /></PrivateRoute>} />
                <Route path="/profiles/:id/edit" element={<PrivateRoute><ProfileForm /></PrivateRoute>} />
                {/* Optional: Profile Detail Page */}
                <Route path="/profiles/:id" element={<PrivateRoute><ProfileDetail /></PrivateRoute>} />

                {/* Separate routes for Data Import and AI Skill Suggester if you want them as distinct pages */}
                <Route path="/data-import" element={<PrivateRoute><DataImport /></PrivateRoute>} />
                {/* If you created a standalone AiSkillSuggesterComponent, uncomment and use it here */}
                {/* <Route path="/suggest-skill" element={<PrivateRoute><AiSkillSuggesterComponent /></PrivateRoute>} /> */}


                {/* Catch-all for undefined routes, redirects to home if authenticated, or login */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default App;