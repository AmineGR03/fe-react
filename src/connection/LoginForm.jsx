import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingCart, FaIdCard } from 'react-icons/fa';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      if (response.data.status === 'success') {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        onLogin(user);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    
  };

  return (
    <>
      <header className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand logo" to="/">Chicken Forever</Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link icon" to="/cart">
                <FaShoppingCart />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link icon" to="/user">
                <FaIdCard /> 
              </Link>
            </li>
          </ul>
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
              <button type="submit" className="btn btn-primary btn-block">Sign in</button>
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
