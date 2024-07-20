const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/MoneyLendingApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected')) // Log success message
.catch(err => console.log(err)); // Log error message

// Use routes defined in 'route.js'
app.use('/api', require('./route'));

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
