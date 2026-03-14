// import { sendEmail } from "../config/nodmailer.js";
// import { generalenquiryEmailTemplate } from "../emailtemplates/generalEnqEmailTemplate.js";

// export const createGeneralController = async (req, res) => {
//     try {
//         const { name, email, phone, serviceType, message } = req.body;

//         const enquiryData = { name, email, phone, serviceType, message };

//         // Send email notification to superAdmin
//         const superAdminEmail = process.env.SUPERADMIN_EMAIL;

//         if (superAdminEmail) {
//             await sendEmail(
//                 generalenquiryEmailTemplate(enquiryData),
//                 superAdminEmail,
//                 "New General Enquiry Received"
//             );
//             return res.status(200).json({ message: "Thank you for your enquiry. We will get back to you soon." });
//         } else {
//             return res.status(500).json({ message: "something went wrong" });
//         }

//     } catch (error) {
//         console.error("Error creating enquiry:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// const { sendEmail } = require("../config/nodmailer");
// const { generalenquiryEmailTemplate } = require("../emailtemplates/generalEnqEmailTemplate");

// exports.createGeneralController = async (req, res) => {
//     try {
//         const { name, email, phone, serviceType, message } = req.body;

//         const enquiryData = { name, email, phone, serviceType, message };

//         // Send email notification to superAdmin
//         const superAdminEmail = process.env.SUPERADMIN_EMAIL;

//         if (superAdminEmail) {
//             await sendEmail(
//                 generalenquiryEmailTemplate(enquiryData),
//                 superAdminEmail,
//                 "New General Enquiry Received"
//             );
//             return res.status(200).json({ message: "Thank you for your enquiry. We will get back to you soon." });
//         } else {
//             return res.status(500).json({ message: "Something went wrong" });
//         }
//     } catch (error) {
//         console.error("Error creating enquiry:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// const generalenquiryEmailTemplate = (enquiryData) => {
//     const emailContent = [];

//     if (enquiryData.name) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Name: ${enquiryData.name}</p>`);
//     }
//     if (enquiryData.email) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Email: ${enquiryData.email}</p>`);
//     }
//     if (enquiryData.phone) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Phone: ${enquiryData.phone}</p>`);
//     }
//     if (enquiryData.serviceType) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Service Type: ${enquiryData.serviceType}</p>`);
//     }
//     if (enquiryData.message) {
//         emailContent.push(`<p style="margin-bottom: 10px;">Message: ${enquiryData.message}</p>`);
//     }

//     return `
//       <div>
//         <p style="font-weight:bold; margin-bottom: 10px;">New Enquiry Received:</p>
//         ${emailContent.join('')}
//       </div>
//     `;
// };

// // Correct Export for CommonJS
// module.exports = { generalenquiryEmailTemplate };
// const { sendEmail } = require("../config/nodmailer");
// const { generalenquiryEmailTemplate } = require("../emailtemplates/generalEnqEmailTemplate");

// exports.createGeneralController = async (req, res) => {
//     try {
//         const { name, email, phone, serviceType, message } = req.body;
//         const enquiryData = { name, email, phone, serviceType, message };

//         const superAdminEmail = process.env.SUPERADMIN_EMAIL;

//         if (!superAdminEmail) {
//             return res.status(500).json({ message: "Super admin email is not configured" });
//         }

//         await sendEmail(
//             generalenquiryEmailTemplate(enquiryData),
//             superAdminEmail,
//             "New General Enquiry Received"
//         );

//         return res.status(200).json({ message: "Thank you for your enquiry. We will get back to you soon." });
//     } catch (error) {
//         console.error("Error creating enquiry:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// const { sendEmail } = require("../config/nodmailer");
// const generalenquiryEmailTemplate = require("../emailtemplates/generalEnqEmailTemplate");

// exports.createGeneralController = async (req, res) => {
//     try {
//         const { name, email, phone, serviceType, message } = req.body;
//         console.log("Received Enquiry Data:", req.body);  // Debugging

//         const superAdminEmail = process.env.SUPERADMIN_EMAIL;
//         if (!superAdminEmail) {
//             console.error("SuperAdmin Email is missing");
//             return res.status(500).json({ message: "Super admin email is not configured" });
//         }

//         try {
//             await sendEmail(
//                 generalenquiryEmailTemplate({ name, email, phone, serviceType, message }),
//                 superAdminEmail,
//                 "New General Enquiry Received"
//             );
//         } catch (emailError) {
//             console.error("Email sending error:", emailError);
//             return res.status(500).json({ message: "Error sending email" });
//         }

//         return res.status(200).json({ message: "Thank you for your enquiry. We will get back to you soon." });
//     } catch (error) {
//         console.error("Error creating enquiry:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
// generalEnquiry.controller.js
const { sendEmail } = require("../config/nodmailer");
const generalenquiryEmailTemplate = require("../emailtemplates/generalEnqEmailTemplate");

exports.createGeneralController = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message } = req.body;
    console.log("Received Enquiry Data:", req.body);  // Debugging

    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    if (!superAdminEmail) {
      console.error("SuperAdmin Email is missing");
      return res.status(500).json({ message: "Super admin email is not configured" });
    }

    try {
      await sendEmail(
        generalenquiryEmailTemplate({ name, email, phone, serviceType, message }),
        superAdminEmail,
        "New General Enquiry Received"
      );
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      return res.status(500).json({ message: "Error sending email" });
    }

    return res.status(200).json({ message: "Thank you for your enquiry. We will get back to you soon." });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

