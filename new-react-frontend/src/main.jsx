// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Only import BrowserRouter here
import { ChakraProvider } from '@chakra-ui/react'; // Assuming you use Chakra UI
import { AuthProvider } from './contexts/AuthProvider'; // Import your AuthProvider

import App from './App.jsx'; // Your main App component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter wraps the entire application to enable routing */}
    <BrowserRouter>
      {/* ChakraProvider for Chakra UI theming */}
      <ChakraProvider>
        {/* AuthProvider provides authentication context to all children */}
        <AuthProvider>
          {/* App component will contain all the Routes definitions */}
          <App />
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);