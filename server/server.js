const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { connectDB } = require('./config/db');
const teamRoutes = require('./routes/teamRoutes'); // Correctly imports your simplified router
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Your CORS configuration is well-defined and secure.
const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
  origin: (origin, callback) => {
    // Allows requests from your frontend's origin and tools like Postman
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Connect to MongoDB when the server starts.
connectDB();

// --- Middleware Setup ---
// The order here is correct: CORS, then JSON parsing.
app.options('*', cors(corsOptions)); // Handle pre-flight requests
app.use(cors(corsOptions));
app.use(express.json()); // Body parser for JSON payloads

// --- API Routes ---
// This is the key line. It correctly tells Express to use your
// simplified router for any request starting with /api/teams.
app.use('/api/teams', teamRoutes);

// A health check endpoint is a great practice for monitoring.
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    message: 'Server is running', 
    timestamp: new Date().toISOString()
  });
});

// --- Error Handling ---
// This should always be the last middleware added.
app.use(errorHandler);

// --- Server Initialization ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;