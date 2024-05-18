import React from 'react';
import './styles.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer   mt-3 py-5" style={{ backgroundColor: '#192a56' ,color:'white'}} > 
      <div className="container text-center">
        <p className="mb-0">&copy; 2024 Chicken Forever. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
