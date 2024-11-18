const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// Use body-parser to parse incoming requests
app.use(bodyParser.json());

// Enable CORS for cross-origin requests
app.use(cors());

// Import the services router
const servicesRouter = require('./routes/services'); // Adjust path if necessary

// Use the services router and prefix it with /api/services
app.use('/api/services', servicesRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
