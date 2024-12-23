const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookingRoutes = require('./routes/booking');  

const app = express();
const PORT = 5001;

app.use(bodyParser.json()); 
app.use(bookingRoutes); 


mongoose.connect('mongodb://localhost:27017/airconnect', {
  useNewUrlParser: true,  
  useUnifiedTopology: true, 
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
