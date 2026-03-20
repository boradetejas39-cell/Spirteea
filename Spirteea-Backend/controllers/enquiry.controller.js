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

        // Create the enquiry in database
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

        if (!createdEnquiry) {
            return res.status(500).json({ message: "Failed to create registration record" });
        }

        // Send email notification to superAdmin (HR Portal)
        const superAdminEmail = process.env.SUPERADMIN_EMAIL;
        if (superAdminEmail) {
            try {
                await sendEmail(
                    enquiryEmailTemplate(enquiryData),
                    superAdminEmail,
                    `New Internship Enquiry: ${nameOfTheStudent}`
                );
            } catch (emailErr) {
                console.error("Error sending admin notification email:", emailErr.message);
            }
        }

        // Send thank you email to the enquirer (Student)
        if (email) {
            try {
                await sendEmail(
                    thankYouEmailTemplate(enquiryData),
                    email,
                    "Regarding Your Internship Training @Spireeta Technologies"
                );
            } catch (emailErr) {
                console.error("Error sending thank you email to student:", emailErr.message);
            }
        }

        return res.status(200).json({
            message: "Thank you for your interest in our internship program. A confirmation email has been sent to you. We will get back to you soon.",
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
