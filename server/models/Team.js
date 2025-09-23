const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be 10 digits']
  },
  regNo: {
    type: String,
    required: true,
    trim: true
  },
  isLeader: {
    type: Boolean,
    default: false
  }
});

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  members: [memberSchema],
  teamId: { type: String, required: true, unique: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for better query performance
teamSchema.index({ teamName: 1 });

module.exports = mongoose.model('Team', teamSchema);