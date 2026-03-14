// import express from "express";
// import { createGeneralController } from "../controllers/generalEnquiry.controller.js";


// const router = express.Router();

// router.post('/createGeneralController', createGeneralController);



// export default router;
const express = require("express");
const { createGeneralController } = require("../controllers/generalEnquiry.controller.js");

const router = express.Router();

router.post('/createGeneralController', createGeneralController);

module.exports = router;
