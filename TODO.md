# Remove Email Sending Code

## Plan Summary
Remove email sending functionality from the project, keeping email collection for validation.

## Tasks
- [ ] Delete server/services/emailService.js
- [ ] Update server/controllers/teamController.js: remove import and email sending code, update success message
- [ ] Remove nodemailer from server/package.json
- [ ] Run npm install in server directory

## Files to Edit
- server/services/emailService.js (delete)
- server/controllers/teamController.js
- server/package.json

# Chaos Theme Implementation for Treasure Hunt Event

## Plan Summary
Change the color theme from green to chaos theme (multi-colored gradients with purple, red, orange, blue) for the treasure hunt event in EventPage.jsx

## Tasks
- [ ] Update background gradients to chaos colors
- [ ] Change button and accent colors to chaos theme
- [ ] Update icon and border colors
- [ ] Test the theme toggle functionality
- [ ] Run development server to verify changes

## Files to Edit
- hungama/client/src/components/EventPage.jsx
