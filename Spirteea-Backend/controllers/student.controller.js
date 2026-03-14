// import Student from "../models/student.modal.js";
// import enquiryModal from "../models/enquiry.modal.js";
// import { enrollSuccessEmailTemplate } from "../emailtemplates/enrollSuccessEmailTemplate.js";
// import { sendEmail } from "../config/nodmailer.js";



// // Controller to create a student
// export const createStudent = async (req, res) => {
//     try {
//         console.log("createStudentcreateStudent", req.body);

//         // Extract dataToSend from req.body
//         const { dataToSend } = req.body;
//         if (!dataToSend) {
//             return res.status(400).json({ message: "Invalid data provided" });
//         }

//         const { enquiryId, ...studentData } = dataToSend;

//         console.log("studentData", studentData);

//         const createdStudent = await Student.create(studentData);

//         // Delete the enquiry if enquiryId is provided and valid
//         if (enquiryId) {
//             const deletedEnquiry = await enquiryModal.findByIdAndDelete(enquiryId);
//             if (!deletedEnquiry) {
//                 console.log(`Enquiry with ID ${enquiryId} not found or already deleted.`);
//             }
//         }

//         // Send email notification if student creation is successful
//         if (createdStudent) {
//             await sendEmail(
//                 enrollSuccessEmailTemplate(studentData),
//                 studentData.email,
//                 "Thank you for joining"
//             );
//         }

//         return res.status(200).json({ message: "Student created successfully", data: createdStudent });
//     } catch (error) {
//         console.error("Error creating student:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to get all students
// export const getStudents = async (req, res) => {
//     try {
//         const students = await Student.find({ deletedAt: null }).sort({ createdAt: -1 });
//         if (!students || students.length === 0) {
//             return res.status(404).json({ message: "No students found" });
//         }
//         return res.status(200).json({ message: "Students fetched successfully", data: students });
//     } catch (error) {
//         console.error("Error fetching students:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// export const getAllDeletedStudents = async (req, res) => {
//     try {
//         const students = await Student.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });

//         if (!students || students.length === 0) {
//             return res.status(404).json({ message: "No students found" });
//         }

//         res.status(200).json({ message: "Deleted students fetched successfully", data: students });
//     } catch (error) {
//         console.error("Error fetching deleted students:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Restore deleted students
// export const restoreStudent = async (req, res) => {
//     try {
//         const { ids } = req.body;
//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing IDs" });
//         }

//         const restoredStudents = [];
//         for (const id of ids) {
//             const student = await Student.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
//             if (student) {
//                 restoredStudents.push(student);
//             }
//         }

//         if (restoredStudents.length === 0) {
//             return res.status(404).json({ message: "No students found to restore" });
//         }

//         res.status(200).json({ message: "Students restored successfully", data: restoredStudents });
//     } catch (error) {
//         console.error('Error restoring students:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // Controller to get a single student by ID
// export const getStudentById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const student = await Student.findById(id);
//         if (!student) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         return res.status(200).json({ message: "Student fetched successfully", data: student });
//     } catch (error) {
//         console.error("Error fetching student:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to update a student by ID
// export const updateStudent = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const studentData = req.body;
//         console.log("updateStudent request received", { id, studentData });

//         const updatedStudent = await Student.findByIdAndUpdate(id, studentData, { new: true });
//         if (!updatedStudent) {
//             return res.status(404).json({ message: "Student not found" });
//         }
//         return res.status(200).json({ message: "Student updated successfully", data: updatedStudent });
//     } catch (error) {
//         console.error("Error updating student:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to soft-delete a student by ID
// export const deleteStudent = async (req, res) => {
//     try {
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing student IDs" });
//         }

//         // Fetch all students to be soft-deleted and filter out the ones that do not exist
//         const studentsToDelete = await Student.find({ _id: { $in: ids } });
//         const validIds = studentsToDelete.map(student => student._id);

//         // Perform the update for the valid IDs to set the deletedAt field
//         const result = await Student.updateMany(
//             { _id: { $in: validIds } },
//             { $set: { deletedAt: new Date() } }
//         );

//         if (result.nModified === 0) {
//             return res.status(404).json({ message: "No students found to delete" });
//         }

//         return res.status(200).json({
//             message: "Students marked as deleted successfully",
//             deletedStudents: validIds,
//         });
//     } catch (error) {
//         console.error("Error marking students as deleted:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to permanently delete students by IDs
// export const permanentDeleteStudents = async (req, res) => {
//     try {
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing student IDs" });
//         }

//         const result = await Student.deleteMany({ _id: { $in: ids } });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: "No students found to delete" });
//         }

//         return res.status(200).json({
//             message: "Students permanently deleted successfully",
//             deletedStudents: ids,
//         });
//     } catch (error) {
//         console.error("Error permanently deleting students:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };
const Student = require("../models/student.modal");
const enquiryModal = require("../models/enquiry.modal");
const { enrollSuccessEmailTemplate } = require("../emailtemplates/enrollSuccessEmailTemplate");
const { sendEmail } = require("../config/nodmailer");

// Controller to create a student
const createStudent = async (req, res) => {
    try {
        console.log("createStudentcreateStudent", req.body);

        // Extract dataToSend from req.body
        const { dataToSend } = req.body;
        if (!dataToSend) {
            return res.status(400).json({ message: "Invalid data provided" });
        }

        const { enquiryId, ...studentData } = dataToSend;
        console.log("studentData", studentData);

        const createdStudent = await Student.create(studentData);

        // Delete the enquiry if enquiryId is provided and valid
        if (enquiryId) {
            const deletedEnquiry = await enquiryModal.findByIdAndDelete(enquiryId);
            if (!deletedEnquiry) {
                console.log(`Enquiry with ID ${enquiryId} not found or already deleted.`);
            }
        }

        // Send email notification if student creation is successful
        if (createdStudent) {
            await sendEmail(
                enrollSuccessEmailTemplate(studentData),
                studentData.email,
                "Thank you for joining"
            );
        }

        return res.status(200).json({ message: "Student created successfully", data: createdStudent });
    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find({ deletedAt: null }).sort({ createdAt: -1 });
        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }
        return res.status(200).json({ message: "Students fetched successfully", data: students });
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAllDeletedStudents = async (req, res) => {
    try {
        const students = await Student.find({ deletedAt: { $ne: null } }).sort({ createdAt: -1 });

        if (!students || students.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        res.status(200).json({ message: "Deleted students fetched successfully", data: students });
    } catch (error) {
        console.error("Error fetching deleted students:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Restore deleted students
const restoreStudent = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing IDs" });
        }

        const restoredStudents = [];
        for (const id of ids) {
            const student = await Student.findByIdAndUpdate(id, { deletedAt: null }, { new: true });
            if (student) {
                restoredStudents.push(student);
            }
        }

        if (restoredStudents.length === 0) {
            return res.status(404).json({ message: "No students found to restore" });
        }

        res.status(200).json({ message: "Students restored successfully", data: restoredStudents });
    } catch (error) {
        console.error('Error restoring students:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get a single student by ID
const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student fetched successfully", data: student });
    } catch (error) {
        console.error("Error fetching student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to update a student by ID
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const studentData = req.body;
        console.log("updateStudent request received", { id, studentData });

        const updatedStudent = await Student.findByIdAndUpdate(id, studentData, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        return res.status(200).json({ message: "Student updated successfully", data: updatedStudent });
    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to soft-delete a student by ID
const deleteStudent = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing student IDs" });
        }

        // Fetch all students to be soft-deleted and filter out the ones that do not exist
        const studentsToDelete = await Student.find({ _id: { $in: ids } });
        const validIds = studentsToDelete.map(student => student._id);

        // Perform the update for the valid IDs to set the deletedAt field
        const result = await Student.updateMany(
            { _id: { $in: validIds } },
            { $set: { deletedAt: new Date() } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: "No students found to delete" });
        }

        return res.status(200).json({
            message: "Students marked as deleted successfully",
            deletedStudents: validIds,
        });
    } catch (error) {
        console.error("Error marking students as deleted:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Controller to permanently delete students by IDs
const permanentDeleteStudents = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing student IDs" });
        }

        const result = await Student.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No students found to delete" });
        }

        return res.status(200).json({
            message: "Students permanently deleted successfully",
            deletedStudents: ids,
        });
    } catch (error) {
        console.error("Error permanently deleting students:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// Export all controllers
module.exports = {
    createStudent,
    getStudents,
    getAllDeletedStudents,
    restoreStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    permanentDeleteStudents
};
