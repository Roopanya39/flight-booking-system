const express = require('express');
const Booking = require('../models/Booking'); 

const router = express.Router();

router.post('/api/bookings', async (req, res) => {
  const { name, phoneNumber, flightData } = req.body;
  console.log(req.body);

  if (!name || !phoneNumber || !flightData) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
  
    const newBooking = new Booking({ name, phoneNumber, flightData });
    await newBooking.save();

    res.status(200).json({ message: 'Booking Successful!', booking: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
