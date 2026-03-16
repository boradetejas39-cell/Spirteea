const express = require("express");
const { createResumeEnquiry, getResumeEnquiries } = require("../controllers/resume.controller");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/createResumeEnquiry", createResumeEnquiry);
router.get("/getResumeEnquiry", authenticate, getResumeEnquiries);
router.get("/getDeletedResumeEnquiry", authenticate, require("../controllers/resume.controller").getDeletedResumeEnquiries);
router.post("/softDeleteResumeEnquiry", authenticate, require("../controllers/resume.controller").softDeleteResumeEnquiry);
router.post("/restoreResumeEnquiry", authenticate, require("../controllers/resume.controller").restoreResumeEnquiry);
router.post("/permanentDeleteResumeEnquiry", authenticate, require("../controllers/resume.controller").permanentDeleteResumeEnquiry);

module.exports = router;
