// C:\Users\OM BHATT\OneDrive\Desktop\RP1\PathForge\new-react-frontend\src\components\Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Updated import path for useAuth

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from useAuth
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <nav style={{ background: '#333', padding: '1rem', color: 'white' }}>
            <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around' }}>
                <li>
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</Link>
                </li>
                <li>
                    <Link to="/profiles" style={{ color: 'white', textDecoration: 'none' }}>Profiles</Link>
                </li>
                <li>
                    <Link to="/skills" style={{ color: 'white', textDecoration: 'none' }}>Skills</Link>
                </li>
                {isAuthenticated ? (
                    <li>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                            Logout
                        </button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        </li>
                        <li>
                            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;