import React, { useState } from 'react';
import axios from 'axios';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/ctc', formData);
      console.log('Contact form submitted successfully:', response.data);
      setSuccessMessage('Your message was submitted successfully. You will receive a response on your email.');
      // Reset form fields after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setError(null);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Error submitting contact form. Please try again later.');
    }
    setSubmitting(false);
  };

  return (
    <section className="contact-section">
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="text-center mb-4" style={{ fontSize: '40px' }}>Contact</h2>
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
                <label htmlFor="phone">Phone</label>
                <input type="number" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea className="form-control" id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
              </div>
              {error && <p className="text-danger mt-2">{error}</p>}
              {successMessage && <p className="text-success mt-2">{successMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
