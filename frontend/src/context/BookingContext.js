import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [availability, setAvailability] = useState([]);

  const checkAvailability = (from, to) => {
    
    setAvailability([
      { company: 'AirConnect', flightNumber: 'AC101', from, to, time: '10:00 AM', image: 'https://via.placeholder.com/100x100?text=AirConnect' },
      { company: 'SkyWings', flightNumber: 'SW202', from, to, time: '02:00 PM', image: 'https://via.placeholder.com/100x100?text=SkyWings' },
      { company: 'GlobalAir', flightNumber: 'GA303', from, to, time: '06:00 PM', image: 'https://via.placeholder.com/100x100?text=GlobalAir' },
    ]);
  };

  return (
    <BookingContext.Provider value={{ availability, checkAvailability }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => useContext(BookingContext);

export { BookingContext };
