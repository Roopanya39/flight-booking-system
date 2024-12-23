import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [showPhoneForm, setShowPhoneForm] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null); 
  const [showLoginError, setShowLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const validatePhoneForm = () => {
    if (!userName || !userPhone) {
      setErrorMessage('Please fill in both name and phone number!');
      return false;
    }
    if (!/^\d{10}$/.test(userPhone)) {
      setErrorMessage('Please enter a valid 10-digit phone number!');
      return false;
    }
    if (!selectedFlight) {
      setErrorMessage('Please select a flight!');
      return false;
    }
    return true;
  };

  const handlePhoneLoginClick = () => {
    setShowPhoneForm(true);
    setErrorMessage('');
  };

  const handlePhoneSubmit = async () => {
    if (validatePhoneForm()) {
      const bookingData = {
        name: userName,
        phoneNumber: userPhone,
        flightData: selectedFlight,
      };

      try {
        
        const response = await axios.post('http://localhost:5001/api/bookings', bookingData);
        console.log('Booking Successful:', response.data);

       
        setShowMessage(true);

        setTimeout(() => {
          navigate('/flight-availability');
        }, 2000);
      } catch (error) {
        console.error('Error submitting booking:', error);
        setShowLoginError(true);
      }
    } else {
      setShowLoginError(true);
    }
  };

  const handleFlightSelection = (flight) => {
    setSelectedFlight(flight); 
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.header}>Login</h2>

        <button
          style={styles.buttonPhone}
          onClick={handlePhoneLoginClick}
        >
          Login with Phone
        </button>

        {showPhoneForm && (
          <div style={styles.phoneForm}>
            <input
              type="text"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Enter your phone number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              style={styles.input}
            />
            
            
            <div style={styles.flightSelection}>
              <h4>Select Flight</h4>
              <button
                style={selectedFlight === 'Flight A' ? styles.selectedButton : styles.flightButton}
                onClick={() => handleFlightSelection('Flight A')}
              >
                Flight A
              </button>
              <button
                style={selectedFlight === 'Flight B' ? styles.selectedButton : styles.flightButton}
                onClick={() => handleFlightSelection('Flight B')}
              >
                Flight B
              </button>
              <button
                style={selectedFlight === 'Flight C' ? styles.selectedButton : styles.flightButton}
                onClick={() => handleFlightSelection('Flight C')}
              >
                Flight C
              </button>
              <button
                style={selectedFlight === 'Flight D' ? styles.selectedButton : styles.flightButton}
                onClick={() => handleFlightSelection('Flight D')}
              >
                Flight D
              </button>
              <button
                style={selectedFlight === 'Flight E' ? styles.selectedButton : styles.flightButton}
                onClick={() => handleFlightSelection('Flight E')}
              >
                Flight E
              </button>

              
              {selectedFlight && (
                <p style={styles.selectedFlightText}>Selected Flight: {selectedFlight}</p>
              )}
            </div>

            <button style={styles.submitButton} onClick={handlePhoneSubmit}>
              Submit
            </button>
          </div>
        )}

        {showLoginError && errorMessage && (
          <p style={styles.errorMessage}>{errorMessage}</p>
        )}

        {showMessage && (
          <div style={styles.successMessage}>
            <h3>Congratulations!</h3>
            <p>Happy Journey!</p>
          </div>
        )}

        <button style={styles.homeButton} onClick={handleGoHome}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/656/169/227/sea-the-sky-flight-the-city-wallpaper-preview.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  buttonPhone: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#34b7f1',
    color: 'white',
  },
  phoneForm: {
    marginTop: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  flightSelection: {
    marginTop: '10px',
    marginBottom: '10px',
  },
  flightButton: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  selectedButton: {
    backgroundColor: '#34b7f1',
    color: 'white',
  },
  selectedFlightText: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px',
    width: '100%',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  successMessage: {
    color: 'green',
    fontSize: '18px',
    marginTop: '20px',
  },
  homeButton: {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    backgroundColor: '#ffc107',
    color: 'white',
  },
};

export default LoginPage;
