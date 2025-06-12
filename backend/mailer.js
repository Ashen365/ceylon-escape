const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendBookingConfirmationEmail({ to, bookingId, session }) {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Booking Confirmed!",
    text: `Your booking (ID: ${bookingId}) is confirmed. Session ID: ${session}. Thank you!`,
    html: `<p>Your booking (ID: <b>${bookingId}</b>) is confirmed.<br>Session ID: <b>${session}</b>.<br>Thank you!</p>`,
  });
}

module.exports = {
  sendBookingConfirmationEmail,
};