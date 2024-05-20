import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from './ProjectRedux/cart/cartReducer';
import { useDispatch } from 'react-redux';
import { FaShoppingCart, FaIdCard } from 'react-icons/fa';
import logo from './img/logopfe.png';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  const fetchItem = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/menus/${id}`);
      const modifiedItem = {
        ...response.data,
        pic: `http://127.0.0.1:8000/storage/images/${response.data.pic}`
      };
      setItem(modifiedItem);
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <header className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#192a56' ,color:'white'}}>
        <div className="container">
        <Link className="navbar-brand logo mx-3 " style={{color:'white'}} to="/"><img src={logo} alt="logo" className="logo-img" />&nbsp;Chicken Forever</Link>
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
      <div className="container mt-5 pt-4">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <img
                  src={item.pic}
                  className="card-img-top"
                  alt={item.name}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p className="card-text">{item.info}</p>
                  <p className="card-text">Price: ${item.price}</p>
                  <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
