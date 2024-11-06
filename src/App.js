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

  const handleChange = (e) => {
    setSecurityCode(e.target.value);
};
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/vendor/security" />} />
        <Route path="/vendor/security" element={<LandingPage securityCode={securityCode} handleChange={handleChange} />} />
        <Route path="/vendorManagement" element={<VendorManagement securityCode={securityCode} />} />
      </Routes>
    </Router>
    // <>
    //   <MultiSelectDropdown />
    // </>
  );
}

export default App;
