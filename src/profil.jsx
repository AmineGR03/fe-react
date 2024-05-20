import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './img/logopfe.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Profil = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    fetchUserInfo();
  };

  const fetchUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('User Info:', response.data.user);
      setUser(response.data.user); // Set the user info in state
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo(); // Fetch user info on component mount if token is available
  }, []);

  return (
    <div className="container">
      <header className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#192a56', color: 'white' }}>
        <div className="container">
          <Link className="navbar-brand logo mx-3" style={{ color: 'white' }} to="/">
            <img src={logo} alt="logo" className="logo-img" /> &nbsp;ChickenForever
          </Link>
        </div>
      </header>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card w-50">
          <div className="card-body">
            <h2 className="text-center">Your Profile</h2>
            <div className="d-flex justify-content-center align-items-center">
              <img src="https://avatar.iran.liara.run/public/girl" alt={user?.name} className="rounded-circle" width={150} />
            </div>
            <p className="lead mt-3 text-center">
              {user?.email}
            </p>
            <p className="lead mt-3 text-center">
              {user?.name}
            </p>
            <p className="lead mt-3 text-center">
              {user?.phone_number}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;

