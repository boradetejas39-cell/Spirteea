const ResumeEnquiry = require("../models/resume.modal");

exports.createResumeEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message, resumeUrl } = req.body;
    const newResume = await ResumeEnquiry.create({
      name,
      email,
      phone,
      message,
      resumeUrl
    });

    res.status(200).json({ message: "Resume submitted successfully", data: newResume });
  } catch (error) {
    console.error("Error creating resume enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getResumeEnquiries = async (req, res) => {
  try {
    await ResumeEnquiry.updateMany({ viewed: false }, { viewed: true });
    const resumes = await ResumeEnquiry.find({ deletedAt: null }).sort({ createdAt: -1 });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "No resume enquiries found" });
    }

    res.status(200).json({ message: "Resume enquiries fetched successfully", data: resumes });
  } catch (error) {
    console.error("Error fetching resume enquiries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDeletedResumeEnquiries = async (req, res) => {
  try {
    const resumes = await ResumeEnquiry.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });
    res.status(200).json({ message: "Deleted resume enquiries fetched successfully", data: resumes });
  } catch (error) {
    console.error("Error fetching deleted resume enquiries:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.softDeleteResumeEnquiry = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs" });
    }
    await ResumeEnquiry.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: new Date() } });
    res.status(200).json({ message: "Resume marked as deleted" });
  } catch (error) {
    console.error("Error soft deleting resume enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.restoreResumeEnquiry = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs" });
    }
    await ResumeEnquiry.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } });
    res.status(200).json({ message: "Resume restored successfully" });
  } catch (error) {
    console.error("Error restoring resume enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.permanentDeleteResumeEnquiry = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Invalid or missing IDs" });
    }
    await ResumeEnquiry.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: "Resume deleted permanently" });
  } catch (error) {
    console.error("Error permanently deleting resume enquiry:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
