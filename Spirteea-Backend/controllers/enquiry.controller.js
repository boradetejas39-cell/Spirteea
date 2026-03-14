// import enquiryModal from "../models/enquiry.modal.js";
// import { sendEmail } from "../config/nodmailer.js";
// import { thankYouEmailTemplate } from "../emailtemplates/thankYouEmailTemplate.js";
// import { enquiryEmailTemplate } from "../emailtemplates/enquiryEmailTemplate.js";


// export const createEnquiryController = async (req, res) => {
//     try {
//         const {
//             nameOfTheStudent,
//             collegeName,
//             collegeAddress,
//             educationalDegree,
//             branch,
//             lastYearPercentageGrade,
//             email,
//             phone,
//             emergencyPhone,
//             address,
//             aadharCardNumber,
//             panNumber,
//             internshipInterestedTechnologies,
//             workingStyle
//         } = req.body;

//         // Create the enquiry
//         const enquiryData = {
//             nameOfTheStudent,
//             collegeName,
//             collegeAddress,
//             educationalDegree,
//             branch,
//             lastYearPercentageGrade,
//             email,
//             phone,
//             emergencyPhone,
//             address,
//             aadharCardNumber,
//             panNumber,
//             internshipInterestedTechnologies,
//             workingStyle,
//             viewed: false,
//         };

//         const createdEnquiry = await enquiryModal.create(enquiryData);

//         // Send email notification to superAdmin
//         const superAdminEmail = process.env.SUPERADMIN_EMAIL;

//         if (createdEnquiry && superAdminEmail) {
//             await sendEmail(
//                 enquiryEmailTemplate(enquiryData),
//                 superAdminEmail,
//                 "New Enquiry Received"
//             );
//         }
//         // Send thank you email to the enquirer
//         if (createdEnquiry) {
//             await sendEmail(
//                 thankYouEmailTemplate(enquiryData),
//                 enquiryData.email,
//                 "Regarding  Your  Internship Training"
//             );
//         }
//         return res.status(200).json({ message: "Thank you for your interest in our internship program. We will get back to you soon", data: createdEnquiry });
//     } catch (error) {
//         console.error("Error creating enquiry:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to get the count of new enquiries
// export const getNewEnquiriesCount = async (req, res) => {
//     try {
//         const enquiryCount = await enquiryModal.countDocuments({ viewed: false, deletedAt: null });
//         res.status(200).json({ enquiryCount });
//     } catch (error) {
//         console.error("Error fetching new enquiries count:", error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// // Controller to get all enquiries
// export const getEnquiries = async (req, res) => {
//     try {
//         // Update the viewed field for all enquiries that have not been viewed yet
//         await enquiryModal.updateMany({ viewed: false }, { viewed: true });

//         // Fetch all enquiries and sort them by creation date in descending order
//         const enquiries = await enquiryModal.find({ deletedAt: null }).sort({ createdAt: -1 });

//         // Check if there are no enquiries
//         if (!enquiries || enquiries.length === 0) {
//             return res.status(404).json({ message: "No enquiries found" });
//         }

//         // Send the response with the enquiries data
//         res.status(200).json({ message: "Enquiries fetched successfully", data: enquiries });
//     } catch (error) {
//         console.error("Error fetching enquiries:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // getAllDeletedEnquiry
// export const getAllDeletedEnquiry = async (req, res) => {
//     try {
//         const enquiries = await enquiryModal.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });

//         // Check if there are no enquiries
//         if (!enquiries || enquiries.length === 0) {
//             return res.status(404).json({ message: "No enquiries found" });
//         }

//         res.status(200).json({ message: "Enquiries fetched successfully", data: enquiries });
//     } catch (error) {
//         console.error("Error fetching enquiries:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// export const restoreEnquiry = async (req, res) => {
//     try {
//         const { ids } = req.body;
//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing IDs" });
//         }

//         const restoredEnquiries = [];
//         for (const id of ids) {
//             const enquiry = await enquiryModal.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
//             if (enquiry) {
//                 restoredEnquiries.push(enquiry);
//             }
//         }

//         if (restoredEnquiries.length === 0) {
//             return res.status(404).json({ message: "No enquiries found to restore" });
//         }

//         res.status(200).json({ message: "Enquiries restored successfully", data: restoredEnquiries });
//     } catch (error) {
//         console.error('Error restoring:', error);
//         return res.status(500).json({ message: 'Something went wrong' });
//     }
// };

// // Controller to soft-delete (mark as deleted) enquiries
// export const deleteEnquiry = async (req, res) => {
//     try {
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing enquiry IDs" });
//         }

//         // Fetch all enquiries to be soft-deleted and filter out the ones that do not exist
//         const enquiriesToDelete = await enquiryModal.find({ _id: { $in: ids } });
//         const validIds = enquiriesToDelete.map(enquiry => enquiry._id);

//         // Perform the update for the valid IDs to set the deletedAt field
//         const result = await enquiryModal.updateMany(
//             { _id: { $in: validIds } },
//             { $set: { deletedAt: new Date() } }
//         );

//         if (result.nModified === 0) {
//             return res.status(404).json({ message: "No enquiries found to delete" });
//         }

//         return res.status(200).json({
//             message: "Enquiries marked as deleted successfully",
//             deletedEnquiries: validIds,
//         });
//     } catch (error) {
//         console.error("Error marking enquiries as deleted:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


// // Controller to permanently delete enquiries
// export const permanentDeleteEnquiry = async (req, res) => {
//     try {
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing enquiry IDs" });
//         }

//         // Fetch all enquiries to be deleted and filter out the ones that do not exist
//         const enquiriesToDelete = await enquiryModal.find({ _id: { $in: ids } });
//         const validIds = enquiriesToDelete.map(enquiry => enquiry._id);

//         // Perform the deletion for the valid IDs
//         const result = await enquiryModal.deleteMany({ _id: { $in: validIds } });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: "No enquiries found to delete" });
//         }

//         return res.status(200).json({
//             message: "Enquiries deleted successfully",
//             deletedEnquiries: validIds,
//         });
//     } catch (error) {
//         console.error("Error permanently deleting enquiries:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const enquiryModal = require("../models/enquiry.modal.js");
const { sendEmail } = require("../config/nodmailer.js");
const { thankYouEmailTemplate } = require("../emailtemplates/thankYouEmailTemplate.js");
const { enquiryEmailTemplate } = require("../emailtemplates/enquiryEmailTemplate.js");

const createEnquiryController = async (req, res) => {
    try {
        const {
            nameOfTheStudent,
            collegeName,
            collegeAddress,
            educationalDegree,
            branch,
            lastYearPercentageGrade,
            email,
            phone,
            emergencyPhone,
            address,
            aadharCardNumber,
            panNumber,
            internshipInterestedTechnologies,
            workingStyle
        } = req.body;

        // Create the enquiry
        const enquiryData = {
            nameOfTheStudent,
            collegeName,
            collegeAddress,
            educationalDegree,
            branch,
            lastYearPercentageGrade,
            email,
            phone,
            emergencyPhone,
            address,
            aadharCardNumber,
            panNumber,
            internshipInterestedTechnologies,
            workingStyle,
            viewed: false,
        };

        const createdEnquiry = await enquiryModal.create(enquiryData);

        // Send email notification to superAdmin
        const superAdminEmail = process.env.SUPERADMIN_EMAIL;

        if (createdEnquiry && superAdminEmail) {
            await sendEmail(
                enquiryEmailTemplate(enquiryData),
                superAdminEmail,
                "New Enquiry Received"
            );
        }

        // Send thank you email to the enquirer
        if (createdEnquiry) {
            await sendEmail(
                thankYouEmailTemplate(enquiryData),
                enquiryData.email,
                "Regarding Your Internship Training"
            );
        }

        return res.status(200).json({
            message: "Thank you for your interest in our internship program. We will get back to you soon",
            data: createdEnquiry
        });
    } catch (error) {
        console.error("Error creating enquiry:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Get the count of new enquiries
const getNewEnquiriesCount = async (req, res) => {
    try {
        const enquiryCount = await enquiryModal.countDocuments({ viewed: false, deletedAt: null });
        res.status(200).json({ enquiryCount });
    } catch (error) {
        console.error("Error fetching new enquiries count:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get all enquiries
const getEnquiries = async (req, res) => {
    try {
        // Update the viewed field for all unseen enquiries
        await enquiryModal.updateMany({ viewed: false }, { viewed: true });

        // Fetch all enquiries and sort by creation date
        const enquiries = await enquiryModal.find({ deletedAt: null }).sort({ createdAt: -1 });

        if (!enquiries || enquiries.length === 0) {
            return res.status(404).json({ message: "No enquiries found" });
        }

        res.status(200).json({ message: "Enquiries fetched successfully", data: enquiries });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all soft-deleted enquiries
const getAllDeletedEnquiry = async (req, res) => {
    try {
        const enquiries = await enquiryModal.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });

        if (!enquiries || enquiries.length === 0) {
            return res.status(404).json({ message: "No enquiries found" });
        }

        res.status(200).json({ message: "Deleted enquiries fetched successfully", data: enquiries });
    } catch (error) {
        console.error("Error fetching deleted enquiries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Restore soft-deleted enquiries
const restoreEnquiry = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing IDs" });
        }

        const restoredEnquiries = [];
        for (const id of ids) {
            const enquiry = await enquiryModal.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
            if (enquiry) {
                restoredEnquiries.push(enquiry);
            }
        }

        if (restoredEnquiries.length === 0) {
            return res.status(404).json({ message: "No enquiries found to restore" });
        }

        res.status(200).json({ message: "Enquiries restored successfully", data: restoredEnquiries });
    } catch (error) {
        console.error("Error restoring enquiries:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Soft-delete (mark as deleted) enquiries
const deleteEnquiry = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing enquiry IDs" });
        }

        const enquiriesToDelete = await enquiryModal.find({ _id: { $in: ids } });
        const validIds = enquiriesToDelete.map(enquiry => enquiry._id);

        const result = await enquiryModal.updateMany(
            { _id: { $in: validIds } },
            { $set: { deletedAt: new Date() } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: "No enquiries found to delete" });
        }

        return res.status(200).json({
            message: "Enquiries marked as deleted successfully",
            deletedEnquiries: validIds,
        });
    } catch (error) {
        console.error("Error marking enquiries as deleted:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Permanently delete enquiries
const permanentDeleteEnquiry = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing enquiry IDs" });
        }

        const enquiriesToDelete = await enquiryModal.find({ _id: { $in: ids } });
        const validIds = enquiriesToDelete.map(enquiry => enquiry._id);

        const result = await enquiryModal.deleteMany({ _id: { $in: validIds } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No enquiries found to delete" });
        }

        return res.status(200).json({
            message: "Enquiries deleted successfully",
            deletedEnquiries: validIds,
        });
    } catch (error) {
        console.error("Error permanently deleting enquiries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Export controllers using CommonJS
module.exports = {
    createEnquiryController,
    getNewEnquiriesCount,
    getEnquiries,
    getAllDeletedEnquiry,
    restoreEnquiry,
    deleteEnquiry,
    permanentDeleteEnquiry,
};
// const enquiryModal = require("../models/enquiry.modal.js");
// const { sendEmail } = require("../config/nodmailer.js");
// const { thankYouEmailTemplate } = require("../emailtemplates/thankYouEmailTemplate.js");
// const { enquiryEmailTemplate } = require("../emailtemplates/enquiryEmailTemplate.js");

// const createEnquiryController = async (req, res) => {
//     try {
//         const {
//             nameOfTheStudent,
//             collegeName,
//             collegeAddress,
//             educationalDegree,
//             branch,
//             lastYearPercentageGrade,
//             email,
//             phone,
//             emergencyPhone,
//             address,
//             aadharCardNumber,
//             panNumber,
//             internshipInterestedTechnologies,
//             workingStyle
//         } = req.body;

//         console.log("Received Enquiry Data:", req.body); // Debugging log

//         // Check if required fields are present
//         if (!nameOfTheStudent || !email || !phone) {
//             return res.status(400).json({ message: "Missing required fields" });
//         }

//         // Check if superAdmin email is set
//         const superAdminEmail = process.env.SUPERADMIN_EMAIL;
//         if (!superAdminEmail) {
//             console.error("SuperAdmin Email is not set");
//             return res.status(500).json({ message: "Super admin email is missing" });
//         }

//         // Create the enquiry object
//         const enquiryData = {
//             nameOfTheStudent,
//             collegeName,
//             collegeAddress,
//             educationalDegree,
//             branch,
//             lastYearPercentageGrade,
//             email,
//             phone,
//             emergencyPhone,
//             address,
//             aadharCardNumber,
//             panNumber,
//             internshipInterestedTechnologies,
//             workingStyle,
//             viewed: false,
//         };

//         // Save enquiry to database
//         const createdEnquiry = await enquiryModal.create(enquiryData);
//         if (!createdEnquiry) {
//             return res.status(500).json({ message: "Failed to save enquiry" });
//         }

//         // Send email to SuperAdmin
//         try {
//             await sendEmail(
//                 enquiryEmailTemplate(enquiryData),
//                 superAdminEmail,
//                 "New Enquiry Received"
//             );
//         } catch (emailError) {
//             console.error("Error sending admin email:", emailError);
//         }

//         // Send thank you email to user
//         try {
//             await sendEmail(
//                 thankYouEmailTemplate(enquiryData),
//                 email,
//                 "Regarding Your Internship Training"
//             );
//         } catch (emailError) {
//             console.error("Error sending thank-you email:", emailError);
//         }

//         return res.status(200).json({
//             message: "Thank you for your interest in our internship program. We will get back to you soon.",
//             data: createdEnquiry
//         });

//     } catch (error) {
//         console.error("Error creating enquiry:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = { createEnquiryController };
