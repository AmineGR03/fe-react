import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../img/logopfe.png';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert(`Welcome! You are now connected.`);
      onLogin(); // Fetch user info after login
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#192a56', color: 'white' }}>
        <div className="container">
          <Link className="navbar-brand logo mx-3" style={{ color: 'white' }} to="/"><img src={logo} alt="logo" className="logo-img" />&nbsp;Chicken Forever</Link>
        </div>
      </header>
      <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
        <div className="card" style={{ width: '500px' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Sign In</h5>
            <form onSubmit={handleSubmit}>
              {error && <div className="alert alert-danger" role="alert">{error}</div>}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                {loading ? 'Loading...' : 'Sign in'}
              </button>
              <div className="text-center mt-3">
                <p>Not a member? <Link to="/signup">Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
