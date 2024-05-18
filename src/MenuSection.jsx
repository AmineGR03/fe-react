import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MenuSection = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

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

  const filteredItems = () => {
    const nameToLower = searchTerm.toLowerCase();
    return items.filter(item => {
      const itemNameToLower = item.name.toLowerCase();
      return itemNameToLower.includes(nameToLower);
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setIsFiltering(false);
  };

  const handleFilterClick = () => {
    setIsFiltering(true);
  };

  const displayItems = isFiltering ? filteredItems() : items;

  return (
    <section>
      <div className="container mt-3">
      <h2 className="text-center mb-4 mt-4">Menu</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="  mb-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control "
                placeholder='Cherchez !'
                  
              />
              <button
                type="button"
                onClick={handleFilterClick}
                className="btn btn-secondary "
              >
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {displayItems.map((item) => (
            <div key={item.id} className="col-md-4 col-lg-3 mb-3">
              <div className="card">
                <img
                  src={item.pic}
                  className="card-img-top image-thumbnail"
                  alt={item.name}
                  height="200px"
                  
                  
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




