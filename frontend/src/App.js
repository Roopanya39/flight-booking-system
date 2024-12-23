import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import BookingForm from './components/BookingForm';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import FlightAvailability from './components/FlightAvailability';
import CallToBook from './components/CallToBook';

const App = () => {
  return (
    <Router>
      <BookingProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/flights" element={<FlightAvailability />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/call-to-book" element={<CallToBook />} />
        </Routes>
      </BookingProvider>
    </Router>
  );
};

export default App;
