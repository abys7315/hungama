const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required.'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    trim: true,
    lowercase: true,
    // Enforce VIT-AP student email at the schema level
    match: [/@vitapstudent\.ac\.in$/, 'Email must end with @vitapstudent.ac.in']
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required.'],
    // Enforce 10-digit mobile number at the schema level
    match: [/^\d{10}$/, 'Mobile number must be 10 digits.']
  },
  regNo: {
    type: String,
    required: [true, 'Registration number is required.'],
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
    required: [true, 'Team name is required.'],
    trim: true,
    unique: true // Ensures no two teams have the same name
  },
  members: {
    type: [memberSchema],
    // Enforce team size of 1 or 2 members at the schema level
    validate: {
      validator: function (membersArray) {
        return membersArray && membersArray.length >= 1 && membersArray.length <= 2;
      },
      message: 'A team must have between 1 and 2 members.'
    }
  },
  teamId: { 
    type: String, 
    required: true, 
    unique: true // Ensures every team gets a unique generated ID
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create indexes to enforce that each member's details are unique across ALL teams in the collection.
// This is the most critical part for data integrity.
teamSchema.index({ "members.email": 1 }, { unique: true });
teamSchema.index({ "members.mobile": 1 }, { unique: true });
teamSchema.index({ "members.regNo": 1 }, { unique: true });

module.exports = mongoose.model('Team', teamSchema);