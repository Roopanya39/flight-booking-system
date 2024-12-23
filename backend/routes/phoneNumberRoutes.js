const express = require('express');
const path = require('path');
const PhoneNumber = require('../models/phoneNumberModel');  

const router = express.Router();

console.log('Resolved Path for PhoneNumber Model:', path.resolve(__dirname, '../models/phoneNumberModel.js'));

router.post('/', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: 'Phone number is required.' });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ message: 'Please enter a valid 10-digit phone number starting with 6-9.' });
    }

    const existingPhoneNumber = await PhoneNumber.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({ message: 'Phone number already exists in the system.' });
    }

    const newPhoneNumber = new PhoneNumber({ phoneNumber });
    await newPhoneNumber.save();

    res.status(201).json({
      message: 'Phone number saved successfully.',
      data: newPhoneNumber,
    });
  } catch (error) {
    console.error('Error in POST /phoneNumbers:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});


router.get('/', async (req, res) => {
  try {
    const phoneNumbers = await PhoneNumber.find();
    res.status(200).json(phoneNumbers);
  } catch (error) {
    console.error('Error in GET /phoneNumbers:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

// DELETE request to delete a phone number by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPhoneNumber = await PhoneNumber.findByIdAndDelete(id);
    if (!deletedPhoneNumber) {
      return res.status(404).json({ message: 'Phone number not found.' });
    }

    res.status(200).json({
      message: 'Phone number deleted successfully.',
      data: deletedPhoneNumber,
    });
  } catch (error) {
    console.error('Error in DELETE /phoneNumbers/:id:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});

module.exports = router;
