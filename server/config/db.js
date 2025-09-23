const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/registration_db';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, connectionOptions);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, mongoose };