const mongoose = require("mongoose");

const generalEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  serviceType: {
    type: String,
  },
  message: {
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
    default: null,
  },
});

module.exports = mongoose.model("GeneralEnquiry", generalEnquirySchema);
