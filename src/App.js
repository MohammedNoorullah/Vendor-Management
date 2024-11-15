import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Config from './config';
import VendorManagement from './screen/VendorManagement';
import LandingPage from "./screen/VedorSecurity/LandingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MultiSelectDropdown from './screen/VendorManagement copy/MultiSelectDropdown';
import { useState } from 'react';

function App() {
  const [securityCode, setSecurityCode] = useState('');
  const [vendorCode, setVendorCode] = useState('');
  const [isVendorCode, setIsVendorCode] = useState(true);

  const handleChange = (event) => {
    const { value } = event.target;

    if (isVendorCode) {
      setVendorCode(value);
    } else {
      setSecurityCode(value);
    }
  };

  const handleToggle = () => {
    setIsVendorCode((prev) => !prev); // Toggle between vendor and security code input
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/vendor/security" />} />
        <Route path="/vendor/security" element={<LandingPage securityCode={securityCode} vendorCode={vendorCode} isVendorCode={isVendorCode} handleChange={handleChange} handleToggle={handleToggle} />} />
        <Route path="/vendorManagement" element={<VendorManagement securityCode={securityCode} vendorCode={vendorCode} />} />
      </Routes>
    </Router>
    // <>
    //   <MultiSelectDropdown />
    // </>
  );
}

export default App;
