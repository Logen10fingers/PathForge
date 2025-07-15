// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\hooks\useAuth.jsx

import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; // Correct relative import to the new context file

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
