// import express from "express";
// import { createGeneralController } from "../controllers/generalEnquiry.controller.js";


// const router = express.Router();

// router.post('/createGeneralController', createGeneralController);



// export default router;
const express = require("express");
const { createGeneralController, getGeneralEnquiries } = require("../controllers/generalEnquiry.controller.js");
const authenticate = require("../middleware/authenticate.js");

const router = express.Router();

router.post('/createGeneralController', createGeneralController);
router.get('/getGeneralEnquiry', authenticate, getGeneralEnquiries);
router.get('/getDeletedGeneralEnquiry', authenticate, require("../controllers/generalEnquiry.controller.js").getDeletedGeneralEnquiries);
router.post('/softDeleteGeneralEnquiry', authenticate, require("../controllers/generalEnquiry.controller.js").softDeleteGeneralEnquiry);
router.post('/restoreGeneralEnquiry', authenticate, require("../controllers/generalEnquiry.controller.js").restoreGeneralEnquiry);
router.post('/permanentDeleteGeneralEnquiry', authenticate, require("../controllers/generalEnquiry.controller.js").permanentDeleteGeneralEnquiry);

module.exports = router;
