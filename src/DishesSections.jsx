import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';

const Dishes = () => {
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

  const highlightedItems = items.filter(item => item.highlight === 1);

  const sliderSettings = {
    dots: false,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 500,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="text-center mb-4 mt-4" style={{fontSize:'40px'}}>Nos plats à la lune</h2>
          <div className="dishes-container">
            <Slider {...sliderSettings}>
              {highlightedItems.map(item => (
                <div key={item.id} className="dish-card">
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img src={item.pic} alt={item.name} width="200px" height="150px" />
                    </div>
                    <div className="col-md-6">
                      <div className="dish-content text-right">
                        <h3>{item.name}</h3>
                        <p>{item.highlight_note}</p>
                        <p className="card-text mt-2 price"><strong>Price : </strong><b style={{color:'#27ae60'}}>{item.price} DH</b></p>
                        
                        <Link to={`/item/${item.id}`} className="btn btn-primary mt-1">
                       View Product
                      </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;



