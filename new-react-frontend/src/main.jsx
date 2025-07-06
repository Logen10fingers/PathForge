import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
// FIXED IMPORT for extendTheme:
import { extendTheme } from '@chakra-ui/react'; // Correct import from chakra-ui/react

// Define a custom theme or use default
const customTheme = extendTheme({
  // Customize your theme here if needed
  // For now, it can be empty to use Chakra's default values
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
