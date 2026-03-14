// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//     nameOfTheStudent: {
//         type: String,
//     },
//     collegeName: {
//         type: String,
//     },
//     collegeAddress: {
//         type: String,
//     },
//     educationalDegree: {
//         type: String,
//     },
//     branch: {
//         type: String,
//     },
//     lastYearPercentageGrade: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     phone: {
//         type: Number,
//     },
//     emergencyPhone: {
//         type: Number,
//     },
//     address: {
//         type: String,
//     },
//     aadharCardNumber: {
//         type: String,
//     },
//     panNumber: {
//         type: String,
//     },
//     internshipInterestedTechnologies: {
//         type: [String],
//     },
//     workingStyle: {
//         type: String,
//     },
//     // additional fields 
//     collegeInternalGuide: {
//         type: String,
//     },
//     collegeExternalGuide: {
//         type: String,
//     },
//     internshipTrainingCoordinator: {
//         type: String,
//     },
//     itpNumber: {
//         type: String,
//     },
//     batchNumber: {
//         type: String,
//     },
//     itpTargetStartDate: {
//         type: Date,
//     },
//     itpTargetEndDate: {
//         type: Date,
//     },
//     itpCompleted: {
//         type: String,        //yes/no
//     },
//     noCompletedReason: {
//         type: String,        //if not completed then reason
//     },
//     actualStartDate: {
//         type: Date,
//     },
//     actualEndDate: {
//         type: Date,
//     },
//     itpProjectName: {
//         type: String,
//     },
//     registrationDate: {
//         type: Date,
//     },
//     candidateReference: {
//         type: String,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     deletedAt: {
//         type: Date || null,
//     },
// });

// export default mongoose.model("student", studentSchema);
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    nameOfTheStudent: {
        type: String,
    },
    collegeName: {
        type: String,
    },
    collegeAddress: {
        type: String,
    },
    educationalDegree: {
        type: String,
    },
    branch: {
        type: String,
    },
    lastYearPercentageGrade: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    emergencyPhone: {
        type: Number,
    },
    address: {
        type: String,
    },
    aadharCardNumber: {
        type: String,
    },
    panNumber: {
        type: String,
    },
    internshipInterestedTechnologies: {
        type: [String],
    },
    workingStyle: {
        type: String,
    },
    // additional fields 
    collegeInternalGuide: {
        type: String,
    },
    collegeExternalGuide: {
        type: String,
    },
    internshipTrainingCoordinator: {
        type: String,
    },
    itpNumber: {
        type: String,
    },
    batchNumber: {
        type: String,
    },
    itpTargetStartDate: {
        type: Date,
    },
    itpTargetEndDate: {
        type: Date,
    },
    itpCompleted: {
        type: String,        //yes/no
    },
    noCompletedReason: {
        type: String,        //if not completed then reason
    },
    actualStartDate: {
        type: Date,
    },
    actualEndDate: {
        type: Date,
    },
    itpProjectName: {
        type: String,
    },
    registrationDate: {
        type: Date,
    },
    candidateReference: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null, // Fixed incorrect type definition
    },
});

module.exports = mongoose.model("Student", studentSchema);
