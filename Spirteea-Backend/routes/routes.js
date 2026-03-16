// import express from "express";
// import enquiryRoutes from "./enquiry.routes.js";
// import superAdminRoutes from "./superAdmin.routes.js";
// import studentRoutes from "./student.routes.js";
// import employeeRoutes from "./employee.routes.js";
// import generalEnquiryRoutes from "./generalEnq.routes.js";

// const router = express.Router();

// router.get('/health-check', (req, res) => {
//     res.status(200).json({ message: 'Hello world' });
// });

// router.use("/", superAdminRoutes);
// router.use("/", studentRoutes);
// router.use("/", enquiryRoutes);
// router.use("/", employeeRoutes);
// router.use("/", generalEnquiryRoutes);


// export default router;
const express = require("express");
const enquiryRoutes = require("./enquiry.routes.js");
const superAdminRoutes = require("./superAdmin.routes.js");
const studentRoutes = require("./student.routes.js");
const employeeRoutes = require("./employee.routes.js");
const generalEnquiryRoutes = require("./generalEnq.routes.js");
const resumeRoutes = require("./resume.routes.js");
// const authenticate = require("../middleware/authenticate");

const router = express.Router();

// router.use(authenticate); // Middleware applied after public routes


router.get("/", (req, res) => {
    res.json({ message: "API is working!" });
});



// ✅ Public route (No authentication required)
router.get("/health-check", (req, res) => {
    res.status(200).json({ message: "API is working!" });
});

router.use("/", superAdminRoutes);
router.use("/", studentRoutes);
router.use("/", enquiryRoutes);
router.use("/", employeeRoutes);
router.use("/", generalEnquiryRoutes);
router.use("/", resumeRoutes);

module.exports = router;
