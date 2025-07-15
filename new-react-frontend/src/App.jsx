// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Import components (ensure correct default/named exports from their files)
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register"; // Corrected import path
import Dashboard from "./components/Dashboard";
import ProfileList from "./components/ProfileList";
import ProfileForm from "./components/ProfileForm";
import ProfileDetail from "./components/ProfileDetail";
import SkillList from "./components/SkillList";
import SkillForm from "./components/SkillForm";
import SkillDetail from "./components/SkillDetail";
import PrivateRoute from "./components/PrivateRoute"; // CORRECTED: This assumes PrivateRoute is a DEFAULT export.

import { AuthProvider } from "./contexts/AuthProvider"; // The AuthProvider component

function App() {
  return (
    <ChakraProvider>
      {/* AuthProvider must wrap the entire application */}
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />{" "}
          {/* Home page, can be public */}
          {/* Private Routes - accessible only if authenticated */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Profiles */}
            <Route path="/profiles" element={<ProfileList />} />
            <Route path="/profiles/new" element={<ProfileForm />} />
            <Route path="/profiles/edit/:id" element={<ProfileForm />} />
            <Route path="/profiles/:id" element={<ProfileDetail />} />

            {/* Skills */}
            <Route path="/skills" element={<SkillList />} />
            <Route path="/skills/new" element={<SkillForm />} />
            <Route path="/skills/edit/:id" element={<SkillForm />} />
            <Route path="/skills/:id" element={<SkillDetail />} />
          </Route>
          {/* Fallback for unknown routes */}
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
