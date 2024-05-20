import React, { useState } from 'react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can replace this with actual form submission logic
  };

  return (
    <section className="contact-section">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="text-center mb-4" style={{fontSize:'40px'}}>Contact</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
