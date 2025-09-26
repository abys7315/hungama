const nodemailer = require('nodemailer');

// Create transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a registration confirmation email to the team leader.
 * @param {string} toEmail - The email address of the team leader.
 * @param {string} teamName - The name of the registered team.
 * @param {string} teamId - The unique ID of the registered team.
 */
async function sendRegistrationEmail(toEmail, teamName, teamId) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: toEmail,
    subject: 'Team Registration Confirmation - Hungama',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Welcome to Hungama!</h2>
        <p>Dear Team Leader,</p>
        <p>Congratulations! Your team <strong>${teamName}</strong> has been successfully registered for the Hungama event.</p>
        <p><strong>Team ID:</strong> ${teamId}</p>
        <p><strong>Venue:</strong> AB-2 Room No. 214</p>
        <p><strong>Time:</strong> 01:45 PM</p>
        <p>Please keep this email for your records. If you have any questions, feel free to contact us.</p>
        <p>Best regards,<br>Milestone club</p>
        <hr style="border: none; border-top: 1px solid #eee;">
        <p style="font-size: 12px; color: #666; text-align: center;">This is an automated email. Please do not reply.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Registration email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending registration email:', error);
    throw error; // Re-throw to allow caller to handle
  }
}

module.exports = {
  sendRegistrationEmail,
};
