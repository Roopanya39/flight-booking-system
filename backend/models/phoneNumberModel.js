const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[6-9]\d{9}$/,  
    },
  },
  { timestamps: true }  
);

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);
