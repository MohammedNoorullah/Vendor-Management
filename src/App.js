import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Config from './config';
import VendorManagement from './screen/VendorManagement';
import LandingPage from "./screen/VedorSecurity/LandingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MultiSelectDropdown from './screen/VendorManagement copy/MultiSelectDropdown';
import { useEffect, useState } from 'react';

function App() {
  const [securityCode, setSecurityCode] = useState('');
  const [vendorCode, setVendorCode] = useState('');
  const [isVendorCode, setIsVendorCode] = useState(false);



  const [currentUrl, setCurrentUrl] = useState('');

  const [countryCode, setCountryCode] = useState('');

  useEffect(() => {
    const url = window.location.hostname;

    const extractedCountryCode = url.slice(0, 2).toLowerCase();

    if (extractedCountryCode === 'lo') {
      setCountryCode('KC');
    } else {
      setCountryCode(extractedCountryCode);
    }
  }, []);

  console.log('currentUrl', currentUrl)
  console.log('countryCode', countryCode)

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
        <Route path="/vendor/security" element={<LandingPage countryCode={countryCode} securityCode={securityCode} vendorCode={vendorCode} isVendorCode={isVendorCode} handleChange={handleChange} handleToggle={handleToggle} />} />
        <Route path="/vendorManagement" element={<VendorManagement countryCode={countryCode} securityCode={securityCode} vendorCode={vendorCode} />} />
      </Routes>
    </Router>
    // <>
    //   <MultiSelectDropdown />
    // </>
  );
}

export default App;
