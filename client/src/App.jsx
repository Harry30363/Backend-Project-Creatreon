import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Homepage from './Homepage'; // Import Home component
import Features from './Features'; // Import Features component
import Resources from './Resources'; // Import Resources component
import Pricing from './Pricing'; // Import Pricing component
import Creators from './Creators'; // Import Creators component
import Loginpage from './Loginpage'; // Import Login component
import Dashboard from './Dashboard'; // Import Dashboard component
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Router>
            <div className="App">
            
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/creators" element={<Creators />} />
                    <Route path="/loginpage" element={<Loginpage setIsLoggedIn={setIsLoggedIn} />} />
                    <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/loginpage" />} />
                </Routes>
                
            </div>
        </Router>
    );
};

export default App;
