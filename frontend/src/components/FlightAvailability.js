import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FlightAvailability = () => {
  const navigate = useNavigate();

  const sampleFlights = [
    {
      company: "Airways A",
      flightNumber: "AA123",
      from: "City A",
      to: "City B",
      time: "10:30 AM",
      duration: "3h 45m",
      price: "$250",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTieZ9dF71BQB6SAQg-zZ3cttbnazEr4WUlAA&s",
    },
    {
      company: "Airways B",
      flightNumber: "BB456",
      from: "City C",
      to: "City D",
      time: "2:00 PM",
      duration: "5h 15m",
      price: "$320",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdLWVzIaoxvzs8JLRIXVbjcSXI-qpEEofc9Q&s",
    },
    {
      company: "Airways C",
      flightNumber: "CC789",
      from: "City E",
      to: "City F",
      time: "6:30 AM",
      duration: "4h 20m",
      price: "$280",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB0rYfRk6fgdMUfHxOI-Dmr0zCiiI_zbwHUw&s",
    },
    {
      company: "Airways D",
      flightNumber: "DD101",
      from: "City G",
      to: "City H",
      time: "9:00 PM",
      duration: "7h 10m",
      price: "$420",
      image: "https://media.cnn.com/api/v1/images/stellar/prod/230131164947-boeing-747-dv-1.jpg?c=16x9&q=w_1280,c_fill",
    },
    {
      company: "Airways E",
      flightNumber: "EE202",
      from: "City I",
      to: "City J",
      time: "1:15 PM",
      duration: "2h 30m",
      price: "$190",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXUaUttGUQo8pHvevjdp6BGMEgg3uQhr_ZLA&s",
    },
  ];

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flightType, setFlightType] = useState('One-way');
  const [filteredFlights, setFilteredFlights] = useState(sampleFlights);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'from') {
      setFrom(value);
    } else if (name === 'to') {
      setTo(value);
    } else if (name === 'flightType') {
      setFlightType(value);
    }
  };

  const filterFlights = () => {
    const filtered = sampleFlights.filter(
      (flight) =>
        (!from || flight.from.toLowerCase().includes(from.toLowerCase())) &&
        (!to || flight.to.toLowerCase().includes(to.toLowerCase())) &&
        (flightType === 'One-way' || flightType === 'Round-trip')
    );
    setFilteredFlights(filtered);
  };

  const handleBookNow = (flight) => {
    setSelectedFlight(flight);
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  // Submit the selected flight to the database
  const handleSubmitFlightData = (phoneNumber) => {
    if (selectedFlight) {
      const flightData = {
        ...selectedFlight,
        phoneNumber: phoneNumber, // Include phone number from login
      };

      // Send the flight data to the backend API (replace with your API URL)
      fetch('https://your-api-endpoint.com/book-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(flightData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Flight booked successfully:', data);
          alert('Your flight has been booked!');
        })
        .catch((error) => {
          console.error('Error booking flight:', error);
        });
    }
  };

  const styles = {
    container: {
      padding: '20px',
      background: 'linear-gradient(120deg, #f0f8ff, #87cefa)',
      fontFamily: 'Arial, sans-serif',
    },
    content: {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
    title: {
      fontSize: '1.8em',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
    },
    filters: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
    },
    formGroup: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ddd',
    },
    button: {
      padding: '8px 12px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#007bff',
      color: '#fff',
      marginTop: '10px',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    flightList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    flightCard: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
      transition: 'transform 0.2s ease',
    },
    flightCardHover: {
      transform: 'translateY(-5px)',
    },
    flightImage: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    details: {
      padding: '15px',
    },
    flightTitle: {
      fontSize: '1.5em',
      color: '#0056b3',
      margin: '0',
    },
    flightInfo: {
      color: '#555',
      margin: '5px 0',
    },
    homeButton: {
      padding: '8px 12px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#28a745',
      color: '#fff',
      marginTop: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Available Flights</h2>

        <button
          onClick={handleHome}
          style={styles.homeButton}
        >
          Home
        </button>

        <div style={styles.filters}>
          <div style={styles.formGroup}>
            <label>From</label>
            <input
              type="text"
              name="from"
              value={from}
              onChange={handleFilterChange}
              placeholder="Enter departure location"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>To</label>
            <input
              type="text"
              name="to"
              value={to}
              onChange={handleFilterChange}
              placeholder="Enter destination"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Flight Type</label>
            <select
              name="flightType"
              value={flightType}
              onChange={handleFilterChange}
              style={styles.input}
            >
              <option value="One-way">One-way</option>
              <option value="Round-trip">Round-trip</option>
            </select>
          </div>
          <button
            onClick={filterFlights}
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Apply Filters
          </button>
        </div>

        <div style={styles.flightList}>
          {filteredFlights.length > 0 ? (
            filteredFlights.map((flight, index) => (
              <div
                key={index}
                style={styles.flightCard}
                onMouseOver={(e) => (e.currentTarget.style.transform = styles.flightCardHover.transform)}
                onMouseOut={(e) => (e.currentTarget.style.transform = 'none')}
              >
                <img src={flight.image} alt={`${flight.company} Logo`} style={styles.flightImage} />
                <div style={styles.details}>
                  <h4 style={styles.flightTitle}>{flight.company}</h4>
                  <p style={styles.flightInfo}>{flight.from} to {flight.to}</p>
                  <p style={styles.flightInfo}><strong>Time:</strong> {flight.time}</p>
                  <p style={styles.flightInfo}><strong>Duration:</strong> {flight.duration}</p>
                  <p style={styles.flightInfo}><strong>Price:</strong> {flight.price}</p>
                  <button
                    onClick={() => handleBookNow(flight)}
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No flights available for your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightAvailability;
