import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';
import ContactSection from './ContactSection';
import Dishes from './DishesSections';
import Cart from './Cart';
import HomePage from './HomePage';
import LoginForm from './connection/LoginForm';
import SignUpForm from './connection/SignUpForm';
import ItemDetail from './productdetail';
import Profil from './profil';

const App = () => {
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
          Authorization: `Bearer ${token}`
        }
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
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage user={user} />}/>
            <Route path="/Dishes" element={<Dishes />} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/menu" element={<MenuSection />} />
            <Route path="/reviews" element={<ReviewSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />}/>
            <Route path="/signup" element={<SignUpForm />}/>
            <Route path="/item/:id" element={<ItemDetail/>} />
            <Route path="/profile" element={<Profil user={user} />}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
