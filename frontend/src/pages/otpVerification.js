import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OTPVerification() {
  const [userOtp, setUserOtp] = useState('');
  const location = useLocation();
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const { name, email, password, role} = location.state || {};

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/auth/verifyOtp', {
        name,
        email,
        password,
        role,
        userOtp 
      });

      switch(role) {
        case "Contractor":
          navigate('/contractor-dashboard');
          break;
        
        case "SiteManager":
          navigate('/site_manager-dashboard');
          break;

        case "Employee":
          navigate('/freelancer-dashboard');
          break;

        default:
          alert("Error in sign up!");
      }

    } catch(err) {
      const errorMsg =
      err.response?.data?.error || // from backend
      err.response?.data?.message || // fallback if backend uses "message"
      err.message || // generic JS error
      'Signup failed.';

      setErrorMsg(errorMsg);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Enter OTP</h2>
        <form onSubmit={handleVerifyOtp}>
          <div className="input-group">
            <label>OTP</label>
            <input
              type="text"
              value={userOtp}
              onChange={(e) => setUserOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Verify</button>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        </form>
      </div>
    </div>
  )
}