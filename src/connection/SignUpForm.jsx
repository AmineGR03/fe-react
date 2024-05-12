import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';
import { FaShoppingCart, FaIdCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword,
      });

      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // Redirect logic
      } else {
        throw new Error('Failed to register. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error('Error:', error.message);
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
                <FaShoppingCart icon="fas fa-shopping-cart" />
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link icon" to="/login">
                <FaIdCard icon="far fa-id-card" />
              </Link>
            </li>
          </ul>
        </div>
      </header>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-50"> {/* Adjust the width here */}
          <div className="card-body">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
              <div className="text-center mt-3">
                <p>Already a member? <Link to="/login">Login</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
