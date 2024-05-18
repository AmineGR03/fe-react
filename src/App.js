import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MenuSection from './MenuSection';
import ReviewSection from './ReviewSection';
import ContactSection from './ContactSection';

import Dishes from './DishesSections';
import Cart from './Cart';
import HomePage from './HomePage';
import LoginForm from './connection/LoginForm';
import SignUpForm from './connection/SignUpForm';
import ItemDetail from './productdetail';

const App = () => {
  return (
    <Router>
      <div>
        
        
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/Dishes" element={<Dishes />} />
            <Route path="/cart" element={<Cart />}/>
            <Route path="/menu" element={<MenuSection />} />
            <Route path="/reviews" element={<ReviewSection />} />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/signup" element={<SignUpForm />}/>
            <Route path="/item/:id" element={<ItemDetail/>} />
          </Routes>
        </main>
       
        
      </div>
    </Router>
  );
};

export default App;
