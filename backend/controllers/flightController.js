const Flight = require('../models/Flight');
const flightsData = require('../data/flights.json');

const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching flights', error: error.message });
  }
};


const addFlight = async (req, res) => {
  try {
    const { flightNumber, departure, arrival, flightType, dateTime, fare } = req.body;
    const newFlight = new Flight({ flightNumber, departure, arrival, flightType, dateTime, fare });
    await newFlight.save();
    res.status(201).json({ message: 'Flight added successfully', flight: newFlight });
  } catch (error) {
    res.status(400).json({ message: 'Error adding flight', error: error.message });
  }
};

module.exports = { getFlights, addFlight };
