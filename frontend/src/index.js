import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import OTPVerification from './pages/otpVerification';
import ContractorDashboard from './pages/contractorDashboard';
import SiteManagerDashboard from './pages/siteManagerDashboard';
import FreelancerDashboard from './pages/freelancerDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/verify-otp" element={<OTPVerification />}/>
      <Route path="/contractor-dashboard" element={<ContractorDashboard />}/>
      <Route path="/site_manager-dashboard" element={<SiteManagerDashboard />}/>
      <Route path="/freelancer-dashboard" element={<FreelancerDashboard />}/>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();