const { body, check } = require('express-validator');

exports.validateTeam = [
  body('teamName')
    .trim()
    .notEmpty()
    .withMessage('Team name is required')
    .isLength({ min: 3 })
    .withMessage('Team name must be at least 3 characters long'),
  
  body('members')
    .isArray({ min: 3, max: 4 })
    .withMessage('Team must have between 3 and 4 members'),
  
  body('members.*.fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required for all members'),
  
  body('members.*.email')
    .isEmail()
    .withMessage('Please provide a valid email for all members')
    .normalizeEmail(),
  
  body('members.*.mobile')
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be exactly 10 digits'),
  
  body('members.*.regNo')
    .trim()
    .notEmpty()
    .withMessage('Registration number is required for all members')
];