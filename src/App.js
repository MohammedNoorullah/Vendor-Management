import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Config from './config';
import VendorManagement from './screen/VendorManagement';
import LandingPage from "./screen/VedorSecurity/LandingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/vendor/security" />} />
        <Route path="/vendor/security" element={<LandingPage />} />
        <Route path="/vendorManagement" element={<VendorManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
