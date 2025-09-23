// services/emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use an App Password for Gmail
    }
});

/**
 * Sends a registration confirmation email to the team leader.
 * @param {string} toEmail - The recipient's email address.
 * @param {string} teamName - The name of the registered team.
 * @param {string} teamId - The unique ID assigned to the team.
 */
async function sendRegistrationEmail(toEmail, teamName, teamId) {
    const whatsappLink = process.env.WHATSAPP_GROUP_LINK;

    const mailOptions = {
        from: `"Hungama" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `✅ Registration Confirmed for ${teamName} - Hungama`,
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>🎉 Congratulations! Your Registration is Confirmed! 🎉</h2>
                <p>Hello,</p>
                <p>Your team, <strong>${teamName}</strong>, has been successfully registered for the <b> Hungama </b> event.</p>
                <p>Your official Team ID is: <strong style="font-size: 1.2em; color: #0056b3;">${teamId}</strong>. Please use this for all future correspondence.</p>
                <p>To receive important announcements and coordinate with organizers, please join our official WhatsApp group:</p>
                <p style="text-align: center;">
                    <a href="${whatsappLink}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Join WhatsApp Group
                    </a>
                </p>
                <p>We are excited to see what you build. Stay tuned for more details!</p>
                <br/>
                <p>Best regards,</p>
                <p><strong>Milestone Club</strong></p>
            </div>
        `
    };
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${toEmail} for team ${teamName}.`);
}

module.exports = { sendRegistrationEmail };