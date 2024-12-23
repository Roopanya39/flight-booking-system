const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: { type: String, required: true },
  availableSeats: { type: Number, required: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
