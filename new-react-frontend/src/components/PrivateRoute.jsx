// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\PrivateRoute.jsx

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

// 🛑🛑🛑 IMPORTANT: This must be a DEFAULT export 🛑🛑🛑
export default PrivateRoute;
