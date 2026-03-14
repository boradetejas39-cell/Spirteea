// import express from "express";
// import authenticate from "../middleware/authenticate.js";
// import { createEnquiryController, deleteEnquiry, getAllDeletedEnquiry, getEnquiries, getNewEnquiriesCount, permanentDeleteEnquiry, restoreEnquiry } from "../controllers/enquiry.controller.js";

// const router = express.Router();

// // web
// router.post('/createEnquiry', createEnquiryController);

// //dashboard
// router.get('/getNewEnquiriesCount', authenticate, getNewEnquiriesCount);
// // router.get('/getEnquiry', authenticate, getEnquiries);
// router.get('/getEnquiry', authenticate, getEnquiries);

// router.get('/getAllDeletedEnquiry', authenticate, getAllDeletedEnquiry);

// // restoreEnquiry
// router.post('/restoreEnquiry', authenticate, restoreEnquiry);


// router.post('/softDeleteEnquiry', authenticate, deleteEnquiry);
// // router.post("/permanentDeleteEnquiry", authenticate, permanentDeleteEnquiry);
// router.post("/permanentDeleteEnquiry", authenticate, permanentDeleteEnquiry);



// export default router;
const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const {
    createEnquiryController,
    deleteEnquiry,
    getAllDeletedEnquiry,
    getEnquiries,
    getNewEnquiriesCount,
    permanentDeleteEnquiry,
    restoreEnquiry
} = require("../controllers/enquiry.controller.js");

const router = express.Router();

// Web
router.post('/createEnquiry', createEnquiryController);

// Dashboard
router.get('/getNewEnquiriesCount', authenticate, getNewEnquiriesCount);
router.get('/getEnquiry', authenticate, getEnquiries);
router.get('/getAllDeletedEnquiry', authenticate, getAllDeletedEnquiry);

// Restore Enquiry
router.post('/restoreEnquiry', authenticate, restoreEnquiry);

// Soft & Permanent Delete
router.post('/softDeleteEnquiry', authenticate, deleteEnquiry);
router.post("/permanentDeleteEnquiry", authenticate, permanentDeleteEnquiry);

module.exports = router;
