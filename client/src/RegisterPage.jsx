import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RegisterPage.css'; // Optional: Add your CSS

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', formData);
      if (response.data.success) {
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => navigate('/loginpage'), 2000); // Redirect to login page after 2 seconds
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while registering.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
