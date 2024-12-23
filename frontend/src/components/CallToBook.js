import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CallToBook = () => {
  const [customerNumber, setCustomerNumber] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccessMessage('');

    if (!customerNumber) {
      setError('Please enter your phone number.');
      return;
    }

    if (!validatePhoneNumber(customerNumber)) {
      setError('Please enter a valid 10-digit phone number starting with 6-9.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/phoneNumbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: customerNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to save phone number.');
        return;
      }

      setSuccessMessage('Your request has been sent to the receptionist. Please contact: +91-1234567890');
      setCustomerNumber(''); 

      setTimeout(() => {
        navigate('/'); 
      }, 3000);
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleGoHome = () => {
    navigate('/'); 
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/023/942/832/small_2x/business-airplane-private-jet-at-sunset-illustration-generative-ai-photo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '20px',
          borderRadius: '10px',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <h2 className="text-center">Call to Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="customerNumber">Enter Your Contact Number:</label>
            <input
              type="text"
              id="customerNumber"
              className="form-control"
              placeholder="Enter your phone number"
              value={customerNumber}
              onChange={(e) => setCustomerNumber(e.target.value)}
              maxLength="10" 
            />
          </div>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {successMessage && <div className="alert alert-success" role="alert">{successMessage}</div>}
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleGoHome}>
              Go to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CallToBook;
