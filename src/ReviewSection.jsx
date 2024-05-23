import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import './ReviewSection.css'; 

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/reviews');
        console.log('API Response:', response.data);
        setReviews(response.data.reviews);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Error fetching reviews.');
      }
    };

    fetchReviews();
  }, []);

  if (!Array.isArray(reviews)) {
    console.error('Expected reviews to be an array, but got:', reviews);
    return null;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    focusOnSelect: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 12000,
    autoplaySpeed: 500,
    cssEase: 'linear',
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? solidStar : regularStar}
          style={{ color: i <= rating ? '#ffc107' : '#e4e5e9' }}
        />
      );
    }
    return stars;
  };

  return (
    <section>
      <div className="container my-3">
        <h2 className="text-center mb-4" style={{ fontSize: '40px' }}>
          Reviews
        </h2>
        {error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <div className="container">
            <div className="col-md-12">
              <Slider {...sliderSettings}>
                {reviews.map((review) => (
                  <div key={review.id} className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">{review.user?.name || 'Anonymous'}</h5>
                      <p className="card-text">{review.content || 'No content provided.'}</p>
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
