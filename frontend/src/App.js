import React, { useState } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setPasswordVisible(false);
    setDropdownValue('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      try {
        const res = await axios.post('http://localhost:3001/api/auth/sendOtp', {
          name,
          email,
          password,
          role: dropdownValue,
        });

        console.log('OTP sent:', res.data);
        navigate('/verify-otp', {
          state: { name, email, password, role: dropdownValue }
        });
      } catch (err) {
        alert('Registration failed: ' + err.response.data?.error || err.message);
      }
    }

    else {
      setErrorMsg('');

      try {
        const res = await axios.post('http://localhost:3001/api/auth/login', {
          email,
          password,
        });

        const {role} = res.data.user;

        console.log(role);

        if(role === "contractor") navigate('/contractor-dashboard');
        else if(role === "site_manager") navigate('/site_manager-dashboard');
        else if(role === "employee") navigate('/freelancer-dashboard');
        else setErrorMsg("User Not Found!");

      } catch (err) {
        if (err.response?.data?.message) {
          setErrorMsg(err.response?.data?.error || err.response?.data?.message || err.message);
        } else {
          setErrorMsg('Login failed.');
        }
      }
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
          <div className="input-group">
          <label>Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
          </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          
          <div className="input-group password-group">
            <label>Password</label>
            <input
              type={isTyping ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
              required
            />
            {isLogin && (
            <p
              className="forgot-password"
              onClick={() => navigate('/forgot-password')}
              style={{ cursor: 'pointer', color: '#007bff', fontSize: '12px', marginTop: '5px' }}
            >
              Forgot Password?
            </p>
           )}

           </div>

          {!isLogin && (
          <div className="input-group password-group">
            <label>Confirm Password</label>
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Confirm your password"
              required
            />
            <span className="toggle-icon" onClick={togglePasswordVisibility}></span>
          </div>
          )}

          {!isLogin && (
            <div className="input-group">
              <label>Select Role</label>
              <select
                value={dropdownValue}
                onChange={(e) => setDropdownValue(e.target.value)}
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="Employee">Freelancer-Employee</option>
                <option value="Contractor">Contractor</option>
                <option value="SiteManager">Site Manager</option>
              </select>
            </div>
            
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>

          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

        </form>

        <p className="toggle-link">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={toggleForm}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}