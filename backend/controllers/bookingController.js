
const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');

const addBooking = async (req, res) => {
  try {
    const { name, phoneNumber, flightData } = req.body;

  
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = new User({ name, phoneNumber });
      await user.save();
    }

    const flight = await Flight.findOne({ name: flightData });

    if (!flight) {
      return res.status(400).json({ message: 'Flight not found!' });
    }

    const newBooking = new Booking({
      userId: user._id, 
      flightId: flight._id, 
      dateTime: new Date(),
    });

    await newBooking.save();

    return res.status(200).json({
      message: 'Booking successful!',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { addBooking };
