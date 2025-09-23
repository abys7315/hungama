const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const teamRoutes = require('./routes/teamRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;


const allowedOrigins = ['https://september-freshers-omega.vercel.app/'];
const corsOptions = {
  origin: (origin, callback) => {
    // Check if the incoming origin is in our whitelist.
    // The '!origin' part allows for server-to-server requests or tools like Postman.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  credentials: true, // This allows cookies and authorization headers.
  optionsSuccessStatus: 200 // For legacy browser compatibility.
};
// Connect to MongoDB
connectDB();

// Middleware
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/teams', teamRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
