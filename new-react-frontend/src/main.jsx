import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
// Correct and single import for BrowserRouter, Routes, and Route for routing
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
// Import new components for detail views
import SkillDetail from './components/SkillDetail.jsx';
import ProfileDetail from './components/ProfileDetail.jsx';

// The customTheme is removed as per the new routing setup,
// using ChakraProvider without a specific theme for simplicity.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      {/* BrowserRouter wraps your entire application to enable routing */}
      <BrowserRouter>
        {/* Routes component defines all the possible routes in your application */}
        <Routes>
          {/* Route for the home page, rendering the App component */}
          <Route path="/" element={<App />} />
          {/* Route for skill detail pages, with a dynamic 'id' parameter */}
          <Route path="/skills/:id" element={<SkillDetail />} />
          {/* Route for profile detail pages, with a dynamic 'id' parameter */}
          <Route path="/profiles/:id" element={<ProfileDetail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
);