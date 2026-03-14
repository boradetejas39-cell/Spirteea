// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const admintokenSchema = new mongoose.Schema({
//     userId: {
//         type: Schema.Types.ObjectId,
//         required: true,
//         ref: "user",
//     },
//     token: {
//         type: String,
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//         expires: 5000,
//     },
// });
// export default mongoose.model("AdminToken", admintokenSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admintokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5000, // Token expires after 5000 seconds (~1.39 hours)
    },
});

module.exports = mongoose.model("AdminToken", admintokenSchema);
