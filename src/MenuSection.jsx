import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MenuSection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/menus')
      .then(response => {
        const modifiedItems = response.data.map(item => ({
          ...item,
          pic: `http://127.0.0.1:8000/storage/images/${item.pic}` 
        }));
        setItems(modifiedItems);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  }, []);

  return (
    <section>
      <div className="container mt-3">
        <h2 className="text-center mb-4">Menu</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {items.map((item) => (
            <div key={item.id} className="col">
              <div className="card h-100">
                <img
                  src={item.pic}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text mt-2 price">
                    <strong>Price:</strong> <span>${item.price}</span>
                  </p>
                  <Link to={`/item/${item.id}`} className="btn btn-primary mt-1">
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
