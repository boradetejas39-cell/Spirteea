// import mongoose from "mongoose";

// const employeeSchema = new mongoose.Schema({
//     employeeID: {
//         type: String,
//     },
//     name: {
//         type: String,
//     },
//     email: {
//         type: String,
//     },
//     phone: {
//         type: String,
//     },
//     address: {
//         type: String,
//     },
//     city: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     position: {
//         type: String,
//     },
//     department: {
//         type: String,
//     },
//     dateOfJoining: {
//         type: Date,
//         required: true
//     },
//     dateOfBirth: {
//         type: Date,
//         required: true
//     },
//     pancardNo:{
//         type: String,
//     },
//     aadharNo: {
//         type: String,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     deletedAt: {
//         type: Date,
//         default: null
//     }
// });

// export default mongoose.model("Employee", employeeSchema);
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
    },
    department: {
        type: String,
    },
    dateOfJoining: {
        type: Date,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    pancardNo: {
        type: String,
    },
    aadharNo: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    }
});

module.exports = mongoose.model("Employee", employeeSchema);
