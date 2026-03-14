// import express from "express";
// import authenticate from "../middleware/authenticate.js";
// import { LoginSuperAdmin, SignupSuperAdmin, getSuperUserInfo, resetPasswordSuperAdmin, resetPasswordWithToken, updateSuperAdminPasswordByID } from "../controllers/superAdmin.controller.js";


// const router = express.Router();

// router.post('/signup', SignupSuperAdmin);
// router.post('/login', LoginSuperAdmin);
// router.post("/reset-password", resetPasswordSuperAdmin);
// router.post("/reset-password-using-link", resetPasswordWithToken);
// router.get('/', authenticate, getSuperUserInfo); //authenticate
// router.put('/updatePasswordByID', authenticate, updateSuperAdminPasswordByID)





// export default router;
const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const { 
    LoginSuperAdmin, 
    SignupSuperAdmin, 
    getSuperUserInfo, 
    resetPasswordSuperAdmin, 
    resetPasswordWithToken, 
    updateSuperAdminPasswordByID 
} = require("../controllers/superAdmin.controller.js");

const router = express.Router();


// ✅ Public route (no authentication required)
router.get("/public-info", (req, res) => {
    res.json({ info: "This is publicly accessible information." });
});

// ❌ Protected route (requires authentication)
router.get("/dashboard", authenticate, (req, res) => {
    res.json({ message: "Welcome to the dashboard!" });
});

router.post('/signup', SignupSuperAdmin);
router.post('/login', LoginSuperAdmin);
router.post("/reset-password", resetPasswordSuperAdmin);
router.post("/reset-password-using-link", resetPasswordWithToken);
router.get('/', authenticate, getSuperUserInfo);
router.put('/updatePasswordByID', authenticate, updateSuperAdminPasswordByID);

module.exports = router;
