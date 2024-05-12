import React, { useState, useEffect, useRef } from 'react';
import './Dishes.css'; // Import CSS file for styling

const Dishes = () => {
  const dishes = [
    {
      id: 1,
      name: 'Grilled Chicken',
      description: 'Juicy grilled chicken served with your choice of sides.',
      imgUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 2,
      name: 'Fried Chicken',
      description: 'Crispy fried chicken served with fries.',
      imgUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce, parmesan cheese, and croutons, dressed with Caesar dressing.',
      imgUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 4,
      name: 'Margherita Pizza',
      description: 'Classic pizza topped with tomato, mozzarella, and basil.',
      imgUrl: 'https://via.placeholder.com/300',
    },
    {
      id: 5,
      name: 'Chocolate Cake',
      description: 'Decadent chocolate cake served with a scoop of vanilla ice cream.',
      imgUrl: 'https://via.placeholder.com/300',
    },
  ];

  const [currentDishId, setCurrentDishId] = useState(1);
  const dishesContainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDishId((prevId) => (prevId % dishes.length) + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [dishes.length]);

  useEffect(() => {
    if (dishesContainerRef.current) {
      const dishWidth = dishesContainerRef.current.offsetWidth / dishes.length;
      const scrollTo = (currentDishId - 1) * dishWidth;
      dishesContainerRef.current.scrollTo({
        left: scrollTo,
        behavior: 'smooth',
      });
    }
  }, [currentDishId, dishes.length]);

  return (
    <section className="dishes-section">
      <div className="container-fluid mt-1">
        <div className="row">
          <div className="col">
            <h2 className="text-center mb-4">Dishes</h2>
            <div className="dishes-container" ref={dishesContainerRef}>
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className={`dish-card ${dish.id === currentDishId ? 'active' : ''}`}
                  style={{ width: `${100 / dishes.length}%` }}
                >
                  <div className="dish-content">
                    <h5>{dish.name}</h5>
                    <p>{dish.description}</p>
                  </div>
                  <div className="dish-image">
                    <img src={dish.imgUrl} alt={dish.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dishes;
