const express = require('express');
const { getFlights, addFlight } = require('../controllers/flightController');

const router = express.Router();

router.get('/', getFlights);
router.post('/', addFlight);

module.exports = router;
