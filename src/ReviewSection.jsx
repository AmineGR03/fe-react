import React from 'react';

const ReviewSection = () => {
  return (
    <section>
      
      <div className="container my-3">
      <h2 className="text-center mb-4">Reviews</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">John Doe</h5>
                <p className="card-text">"Great food and excellent service! Highly recommended!"</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Jane Smith</h5>
                <p className="card-text">"The best chicken dishes I've ever tasted! Will definitely come back!"</p>
              </div>
            </div>
          </div>
          {/* Add more reviews as needed */}
        </div>
      </div>
    </section>
  );
}

export default ReviewSection;
