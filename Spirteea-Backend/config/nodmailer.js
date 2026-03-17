// // const nodemailer = require("nodemailer");

// // // Create transporter using GoDaddy's SMTP settings
// const nodemailer = require("nodemailer");


// const transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net", // GoDaddy's SMTP server
//   port: 587, // SMTP port for TLS
//   secure: false, // Use STARTTLS (not SSL)
//   requireTLS: true, // Require TLS
//   auth: {
//     user: "hr@spireeta.com", // Your GoDaddy email address
//     pass: "Gajanan123456!", // Your GoDaddy email password
//   },
//   tls: {
//     rejectUnauthorized: false, // Allow self-signed certificates
//   },
// });

// // Function to send an email
// const sendEmail = async (html, to, subject) => {
//   try {
//     const mailOptions = {
//       from: '"Spireeta HR" <hr@spireeta.com>', // Proper sender format
//       to: to, // Recipient email
//       subject: subject, // Email subject
//       html: html, // Email body (HTML format)
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", info.response);

//     return 200; // Success
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return 500; // Error
//   }
// };

// // Export the sendEmail function
// module.exports = { sendEmail };
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "mail.spireeta.com", // Change to your cPanel email SMTP host
//   port: 465, // Use 465 for SSL or 587 for TLS
//   secure: true, // True for port 465 (SSL), false for 587 (TLS)
//   auth: {
//     user: "hr@spireeta.com", // Your email address
//     pass: ")Z]6?mzG$xou", // Your email password
//   },
//   tls: {
//     rejectUnauthorized: false, // Allow self-signed certificates
//   },
// });

// const sendEmail = async (html, to, subject) => {
//   try {
//     const mailOptions = {
//       from: '"Spireeta HR" <hr@spireeta.com>',
//       to: to,
//       subject: subject,
//       html: html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", info.response);
//     return 200;
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return 500;
//   }
// };

// module.exports = { sendEmail };
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "mail.thehostme.com", // Try mail.thehostme.com or 157.66.191.8
//   port: 465, // Or 587 if 465 fails
//   secure: true, // true for 465 (SSL), false for 587 (TLS)
//   auth: {
//     user: "hr@spireeta.com",
//     pass: ")Z]6?mzG$xou", // Use the actual email password
//   },
//   tls: {
//     rejectUnauthorized: false, // Prevent SSL certificate issues
//   },
//   debug: true, // Enable debugging logs
// });

// const sendEmail = async (html, to, subject) => {
//   try {
//     const mailOptions = {
//       from: '"Spireeta HR" <hr@spireeta.com>',
//       to: to,
//       subject: subject,
//       html: html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", info.response);
//     return 200;
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return 500;
//   }
// };

// module.exports = { sendEmail };

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtpout.secureserver.net", // GoDaddy SMTP Host
//   port: 465, // 465 for SSL (recommended), 587 for TLS
//   secure: true, // true for 465 (SSL), false for 587 (TLS)
//   auth: {
//     user: "hr@spireeta.com", // Your GoDaddy email
//     pass: "Gajanan123456!", // Your actual email password
//   },
//   tls: {
//     rejectUnauthorized: true, // More secure, set to false only if you get SSL errors
//   },
//   debug: true, // Enable debugging logs
// });

// const sendEmail = async (html, to, subject) => {
//   try {
//     const mailOptions = {
//       from: '"Spireeta HR" <hr@spireeta.com>',
//       to: to,
//       subject: subject,
//       html: html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", info.response);
//     return 200;
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return 500;
//   }
// };

// // module.exports = { sendEmail };
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   sendmail: true, // Use system Sendmail instead of SMTP
//   newline: "unix",
//   path: "/sbin/sendmail", // Updated Sendmail path from your server
// });

// const sendEmail = async (html, to, subject) => {
//   try {
//     const mailOptions = {
//       from: '"Spireeta HR" <hr@spireeta.com>',
//       to: to,
//       subject: subject,
//       html: html,
//     };

//     const info = await transporter.sendMail(mailOptions);
//     console.log("✅ Email sent successfully:", info.response);
//     return 200;
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
//     return 500;
//   }
// };

// module.exports = { sendEmail };
const nodemailer = require("nodemailer");

// SMTP from .env so you can change host or leave empty to skip sending
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "465", 10);
const SMTP_SECURE = process.env.SMTP_SECURE !== "false";
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || '"Spireeta HR" <hr@spireeta.com>';

const transporter = SMTP_HOST && SMTP_USER
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
      tls: { rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false" },
    })
  : null;

const sendEmail = async (html, to, subject) => {
  if (!transporter) {
    console.log("[EMAIL] Skipped (no SMTP_HOST/SMTP_USER in .env). Add SMTP_* to enable.");
    return 200;
  }
  try {
    const mailOptions = {
      from: SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.response);
    return 200;
  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    return 200; // Don't fail the request; enquiry is already saved
  }
};

module.exports = { sendEmail };