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
const GeneralEnquiry = require("../models/generalEnquiry.modal");
const { sendEmail } = require("../config/nodmailer");
const generalenquiryEmailTemplate = require("../emailtemplates/generalEnqEmailTemplate");

exports.createGeneralController = async (req, res) => {
  try {
    const { name, email, phone, serviceType, message } = req.body;
    console.log("Received General Enquiry Data:", req.body);

    // Save to database
    const newEnquiry = await GeneralEnquiry.create({
      name,
      email,
      phone,
      serviceType,
      message
    });

    const superAdminEmail = process.env.SUPERADMIN_EMAIL;
    if (superAdminEmail) {
      try {
        await sendEmail(
          generalenquiryEmailTemplate({ name, email, phone, serviceType, message }),
          superAdminEmail,
          "New General Enquiry Received"
        );
      } catch (emailError) {
        console.error("Email sending error:", emailError);
      }
    }

    return res.status(200).json({ 
      message: "Thank you for your enquiry. We will get back to you soon.",
      data: newEnquiry
    });
  } catch (error) {
    console.error("Error creating general enquiry:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getGeneralEnquiries = async (req, res) => {
  try {
    await GeneralEnquiry.updateMany({ viewed: false }, { viewed: true });
    const enquiries = await GeneralEnquiry.find({ deletedAt: null }).sort({ createdAt: -1 });
    
    if (!enquiries || enquiries.length === 0) {
      return res.status(404).json({ message: "No general enquiries found" });
    }

    res.status(200).json({ message: "General enquiries fetched successfully", data: enquiries });
  } catch (error) {
    console.error("Error fetching general enquiries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDeletedGeneralEnquiries = async (req, res) => {
  try {
    const enquiries = await GeneralEnquiry.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Deleted general enquiries fetched successfully", data: enquiries });
  } catch (error) {
    console.error("Error fetching deleted general enquiries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.softDeleteGeneralEnquiry = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs" });
    }
    await GeneralEnquiry.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: new Date() } });
    res.status(200).json({ message: "Enquiries marked as deleted" });
  } catch (error) {
    console.error("Error soft deleting general enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.restoreGeneralEnquiry = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs" });
    }
    await GeneralEnquiry.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } });
    res.status(200).json({ message: "Enquiries restored successfully" });
  } catch (error) {
    console.error("Error restoring general enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.permanentDeleteGeneralEnquiry = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs" });
    }
    await GeneralEnquiry.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Enquiries deleted permanently" });
  } catch (error) {
    console.error("Error permanently deleting general enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

