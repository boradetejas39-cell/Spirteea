// import mongoose from "mongoose";

// const enquirySchema = new mongoose.Schema({
//   nameOfTheStudent: {
//     type: String,
//   },
//   collegeName: {
//     type: String,
//   },
//   collegeAddress: {
//     type: String,
//   },
//   educationalDegree: {
//     type: String,
//   },
//   branch: {
//     type: String,
//   },
//   lastYearPercentageGrade: {
//     type: String,
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: Number,
//   },
//   emergencyPhone: {
//     type: Number,
//   },
//   address: {
//     type: String,
//   },
//   aadharCardNumber: {
//     type: String,
//   },
//   panNumber: {
//     type: String,
//   },
//   internshipInterestedTechnologies: {
//     type: [String],
//   },
//   workingStyle: {
//     type: String,
//   },
//   viewed: {
//     type: Boolean,
//     default: false
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   deletedAt: {
//     type: Date || null,
//   },
// });

// export default mongoose.model("enquiry", enquirySchema);
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
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
  viewed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: null, // Changed from `type: Date || null`
  },
});

module.exports = mongoose.model("Enquiry", enquirySchema);
