import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MIIScreen from './Screens/MII/MIIScreen';
import GEMScreen from './Screens/GEM/GEMScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import SignUpForm from './Screens/SignUp/SignUpScreen';
import './App.css';
import Front from "./Screens/Front/front";
import WarrantyScreen from "./Screens/Warranty/WarrantyScreen";

function App() {
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    return savedUserData ? JSON.parse(savedUserData) : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const savedUserData = localStorage.getItem('userData');
      setUserData(savedUserData ? JSON.parse(savedUserData) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className='app'>
        <Routes>
          <Route path="/" element={<LoginScreen setUserData={setUserData} />} />
          <Route path="/GEM_certificate" element={<GEMScreen userData={userData} />} />
          <Route path="/holoware_pricing" element={<Front userData={userData} />} />
          <Route path="/MII_certificate" element={<MIIScreen userData={userData} />} />
          <Route path="/Warranty_certificate" element={<WarrantyScreen userData={userData}/>} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
