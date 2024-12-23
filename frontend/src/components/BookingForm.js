import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const BookingForm = ({ userId }) => {
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [flightType, setFlightType] = useState('One-way');
  const [dateTime, setDateTime] = useState('');
  const [fare, setFare] = useState(0);
  const [errors, setErrors] = useState({
    departure: '',
    arrival: '',
    dateTime: '',
    flightId: '',
  });
  const [flights, setFlights] = useState([]); 
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    
    axios.get('/api/flights') 
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching flights:", error);
      });
  }, []);

  const calculateFare = () => {
    let baseFare = 100;

    if (departure && arrival) {
      baseFare += Math.abs(departure.length - arrival.length) * 10;
    }

    if (flightType === 'Round-trip') {
      baseFare *= 1.8;
    }

    setFare(baseFare);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departure') {
      setDeparture(value);
    } else if (name === 'arrival') {
      setArrival(value);
    } else if (name === 'flightType') {
      setFlightType(value);
    } else if (name === 'dateTime') {
      setDateTime(value);
    } else if (name === 'flightId') {
      setSelectedFlight(value);
    }

    calculateFare();
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { departure: '', arrival: '', dateTime: '', flightId: '' };

    const locationRegex = /^[A-Za-z\s]+$/;
    if (!departure) {
      newErrors.departure = 'Departure location is required.';
      formIsValid = false;
    } else if (!locationRegex.test(departure)) {
      newErrors.departure = 'Departure location must contain only letters and spaces.';
      formIsValid = false;
    }

    if (!arrival) {
      newErrors.arrival = 'Arrival location is required.';
      formIsValid = false;
    } else if (!locationRegex.test(arrival)) {
      newErrors.arrival = 'Arrival location must contain only letters and spaces.';
      formIsValid = false;
    }

    if (!dateTime) {
      newErrors.dateTime = 'Date and time are required.';
      formIsValid = false;
    } else if (new Date(dateTime) < new Date()) {
      newErrors.dateTime = 'Please select a future date and time.';
      formIsValid = false;
    }

    if (!selectedFlight) {
      newErrors.flightId = 'Please select a flight.';
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSubmitted(true);

      const bookingData = {
        userId: userId, 
        flightId: selectedFlight, 
        dateTime: dateTime,
      };

      axios.post('http://localhost:5001/api/bookings', bookingData)
        .then((response) => {
          alert('Happy Journey, your flight has been booked!');
          navigate('/');
        })
        .catch((error) => {
          console.error("There was an error booking the flight:", error);
        });
    } else {
      console.log('Form is invalid.');
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="booking-form">
      <style jsx>{`
        .booking-form {
          margin-top: 50px;
          padding: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 50%;
          margin-left: auto;
          margin-right: auto;
        }

        .booking-form h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .booking-form form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .booking-form input,
        .booking-form select,
        .booking-form button {
          padding: 10px;
          font-size: 16px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        .booking-form button {
          background-color: #4caf50;
          color: white;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .booking-form button:hover {
          background-color: #45a049;
        }

        .booking-form p {
          font-size: 18px;
          font-weight: bold;
        }

        .booking-form input[type="datetime-local"] {
          cursor: pointer;
        }

        .error {
          color: red;
          font-size: 14px;
        }

        .success-message {
          color: green;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
          margin-top: 20px;
        }

        .home-button {
          margin-top: 20px;
          padding: 10px;
          background-color: #007bff;
          color: white;
          text-align: center;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          font-size: 16px;
        }

        .home-button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <div style={styles.container}>
        <h2>Book Your Flight</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Departure Location</label>
            <input
              type="text"
              name="departure"
              value={departure}
              onChange={handleChange}
              placeholder="Enter departure location"
            />
            {errors.departure && <div className="error">{errors.departure}</div>}
          </div>

          <div>
            <label>Arrival Location</label>
            <input
              type="text"
              name="arrival"
              value={arrival}
              onChange={handleChange}
              placeholder="Enter arrival location"
            />
            {errors.arrival && <div className="error">{errors.arrival}</div>}
          </div>

          <div>
            <label>Flight Type</label>
            <select
              name="flightType"
              value={flightType}
              onChange={handleChange}
            >
              <option value="One-way">One-way</option>
              <option value="Round-trip">Round-trip</option>
            </select>
          </div>

          <div>
            <label>Select Flight</label>
            <select
              name="flightId"
              value={selectedFlight}
              onChange={handleChange}
            >
              <option value="">Select a flight</option>
              {flights.map((flight) => (
                <option key={flight._id} value={flight._id}>
                  {flight.name} ({flight.departure} to {flight.arrival})
                </option>
              ))}
            </select>
            {errors.flightId && <div className="error">{errors.flightId}</div>}
          </div>

          <div>
            <label>Date and Time</label>
            <input
              type="datetime-local"
              name="dateTime"
              value={dateTime}
              onChange={handleChange}
            />
            {errors.dateTime && <div className="error">{errors.dateTime}</div>}
          </div>

          <div>
            <p><strong>Estimated Fare: ${fare}</strong></p>
          </div>

          <button type="submit">Submit</button>
        </form>

        {submitted && <div className="success-message">Happy Journey!</div>}

        <button className="home-button" onClick={handleHomeClick}>
          Go to Home
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/656/169/227/sea-the-sky-flight-the-city-wallpaper-preview.jpg)', // Replace with your background image URL
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '50px',
    borderRadius: '10px',
  },
};

export default BookingForm;
