import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleCallBooking = () => {
   
    navigate('/call-to-book');
  };

  const handleBookLinkClick = () => {
    
    navigate('/flights');
  };

  return (
    <div
      style={{
        backgroundImage: "url('https://w0.peakpx.com/wallpaper/126/434/HD-wallpaper-airplane-takeoff-during-sunset-airplane-sun-pier-sunset-nature-sky-sea.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        color: 'white',
      }}
    >
     
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
          <a href="#" style={{ textDecoration: 'none', color: 'white' }}>
            
          </a>
        </div>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            margin: 0,
            padding: 0,
            gap: '20px',
          }}
        >
          <li>
            <a
              href="/booking"
              onClick={handleBookLinkClick}
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Book
            </a>
          </li>
          <li>
            <a
              href="/flights"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Flights
            </a>
          </li>
          <li>
            <a
              href="/login"
              style={{
                textDecoration: 'none',
                color: 'white',
                fontSize: '16px',
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

     
      <div className="container text-center my-5">
        <h1>Welcome to ViswaRoopa Airways</h1>
        <p className="lead">Book your flights with ease and get real-time updates.</p>
        <div style={{ marginBottom: '20px' }}>
          <button
            className="btn btn-primary"
            style={{ marginRight: '20px' }} 
            onClick={handleBookLinkClick}
          >
            Book a Flight
          </button>
          <button
            className="btn btn-secondary"
            style={{ marginLeft: '20px' }}
            onClick={handleCallBooking}
          >
            Call to Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
