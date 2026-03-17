// import bcrypt from "bcrypt";
// import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import Admin from '../models/user.modal.js'
// import adminTokenModal from "../models/adminToken.modal.js";
// import crypto, { randomUUID } from "crypto";
// import { sendEmail } from "../config/nodmailer.js";


// export const SignupSuperAdmin = async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(422).json({ error: "plz filled the field properly" });
//     }
//     try {
//         const checkEmail = await Admin.findOne({ email: req.body.email });
//         if (checkEmail) {
//             return res.send({ message: "user already exist" });
//         }
//         if (password) {
//             const salt = bcrypt.genSaltSync(12);
//             const hashPassword = bcrypt.hashSync(password, salt);
//             await Admin.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hashPassword,
//             });
//             res.status(201).json({ message: "New user is created" });
//         } else {
//             res.status(403).json({ message: "Please Enter valid credential" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json("Something went wrong...");
//     }
// };

// export const LoginSuperAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         // console.log(req.body);
//         if (!email || !password) {
//             return res.status(400).json({ message: "Please filled the data" });
//         }
//         const adminlogin = await Admin.findOne({ email: email });
//         if (!adminlogin) {
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }
//         const isMatch = await bcrypt.compare(password, adminlogin.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }

//         // console.log("adminlogin*****", adminlogin)

//         const token = jwt.sign({ _id: adminlogin._id }, process.env.SECRET_KEY, {
//             expiresIn: "1d",
//         });

//         res.status(200).json({
//             message: "Login successful",
//             data: adminlogin,
//             token: token,
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Server Error" });
//     }
// };

// export const resetPasswordSuperAdmin = async (req, res) => {
//     try {
//         // console.log("resetPasswordAdmin****", req.body)
//         if (!req.body.email) {
//             return res.status(400).send("Email required");
//         }
//         const admin = await Admin.findOne({ email: req.body.email });
//         if (!admin) {
//             return res.status(400).send({ error: "User does not exist" });
//         }

//         let token = await adminTokenModal.findOne({ userId: admin._id });
//         if (token) {
//             await token.deleteOne();
//         }

//         let resetToken = crypto.randomBytes(32).toString("hex");
//         const hash = await bcrypt.hash(resetToken, Number(bcrypt.genSalt(12)));

//         await new adminTokenModal({
//             userId: admin._id,
//             token: hash,
//             createdAt: Date.now(),
//         }).save();

//         const link = `${process.env.ADMIN_PORTAL_URL}reset-password/${admin._id}/${resetToken}`;
//         // console.log("link**", link);

//         const emailHtml = `
//     <div style="display: flex;flex-direction: column;align-items: center;justify-content: center;background-color: rgba(231, 240, 249, 0.759);width: 100%;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); font-family: Poppins, sans-serif;">

//         <div style="margin: 5px; display: grid;flex-direction: column; justify-content: center; align-items: center;width: 100%;">
//         <div style="text-align: center; margin-top:10px ;">
//         <!-- <h1 style="font-size: 24px;">Wista</h1> -->
        
//     </div>

//             <div style=" text-align: center;background-color: #fff; border-radius: 5px; margin:30px;">
//                 <div style="padding: 30px;">
//                     <h1 style="font-size: 24px;margin-bottom: 20px; ">Password Reset</h1>

//                     <p style="margin-bottom: 20px; line-height: 1.5;">If you've lost your password or wish to reset
//                         it,<br>
//                         use
//                         the link below to get started.</p>

//                     <a href=${link} target="_blank"
//                         style="background-color: #4E8CF7;color: #fff;padding:10px 20px;text-decoration: none;border-radius: 5px;display: inline-block;font-size: 16px;margin-bottom: 20px;">Reset
//                         Your Password</a>

//                     <p style=" margin-bottom: 20px;line-height: 1.5;">If you did not request a password reset, you can
//                         safely
//                         ignore this email. Only<br> a person with access
//                         to your email can reset your account password.
//                     </p>
//                 </div>
//             </div>
//         </div>

//     </div>`;

//         const emailStatus = await sendEmail(emailHtml, admin.email, " spireeta - reset password link");

//         if (emailStatus === 200) {
//             return res.status(200).json({ message: "Password reset link sent to your email address" });
//         } else {
//             return res.status(500).json({ message: "Failed to send recovery email" });
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json("Something went wrong...");
//     }
// };

// export const resetPasswordWithToken = async (req, res) => {
//     try {
//         const { userId, token, password } = req.body;

//         const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(userId);
//         if (!isValidObjectId) {
//             res.status(400).send({ error: "Invalid or expired password reset token" });
//             return;
//         }
//         const AdminInfo = await Admin.findOne({ _id: userId });
//         if (!AdminInfo) {
//             res.status(400).send({ error: "Invalid or expired password reset token" });
//             return;
//         }
//         const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(12));
//         const userToken = await adminTokenModal.findOne({ userId: userId });

//         if (!userToken) {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }
//         const isValid = await bcrypt.compare(token, userToken.token);
//         if (!isValid) {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }
//         const user = await Admin.findByIdAndUpdate(userId, {
//             password: passwordHash,
//         });

//         if (user) {
//             await adminTokenModal.deleteOne({ userId: userId });
//             return res.status(200).send({ message: "Password changed successfully" });
//         } else {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json("Something went wrong...");
//     }
// };

// export const getSuperUserInfo = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await Admin.findById(verifyToken._id);

//         if (!user) {
//             return res.status(400).json({ message: "Invalid Credentials" });
//         }
//         let newUser = user.toObject();

//         delete newUser.password;
//         res
//             .status(200)
//             .json({ message: "Login Successfull", data: newUser });
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({ message: "Invalid Credentials" });
//     }
// };

// export const updateSuperAdminPasswordByID = async (req, res) => {
//     try {
//         const { id, password } = req.body

//         const salt = bcrypt.genSaltSync(12);
//         const hashPassword = bcrypt.hashSync(password, salt);

//         const pass = await Admin.findById(id);
//         if (!pass) {
//             return res.status(404).send({ message: `user not found ` });
//         }
//         pass.password = hashPassword
//         await pass.save();
//         res.status(200).json({ message: "Password updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }

// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/user.modal.js");
// const adminTokenModal = require("../models/adminToken.modal.js");
// const crypto = require("crypto");
// const { sendEmail } = require("../config/nodmailer.js");

// // SignupSuperAdmin
// exports.SignupSuperAdmin = async (req, res) => {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//         return res.status(422).json({ error: "Please fill the fields properly" });
//     }
//     try {
//         const checkEmail = await Admin.findOne({ email: req.body.email });
//         if (checkEmail) {
//             return res.status(400).json({ message: "User already exists" });
//         }
//         if (password) {
//             const salt = bcrypt.genSaltSync(12);
//             const hashPassword = bcrypt.hashSync(password, salt);
//             await Admin.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 password: hashPassword,
//             });
//             res.status(201).json({ message: "New user created successfully" });
//         } else {
//             res.status(403).json({ message: "Please enter valid credentials" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("Something went wrong...");
//     }
// };

// // LoginSuperAdmin
// exports.LoginSuperAdmin = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: "Please fill in the required fields" });
//         }

//         const adminlogin = await Admin.findOne({ email: email });
//         if (!adminlogin) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const isMatch = await bcrypt.compare(password, adminlogin.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         const token = jwt.sign({ _id: adminlogin._id }, process.env.SECRET_KEY, {
//             expiresIn: "1d",
//         });

//         res.status(200).json({
//             message: "Login successful",
//             data: adminlogin,
//             token: token,
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// // Reset Password SuperAdmin
// exports.resetPasswordSuperAdmin = async (req, res) => {
//     try {
//         if (!req.body.email) {
//             return res.status(400).send("Email required");
//         }
//         const admin = await Admin.findOne({ email: req.body.email });
//         if (!admin) {
//             return res.status(400).send({ error: "User does not exist" });
//         }

//         let token = await adminTokenModal.findOne({ userId: admin._id });
//         if (token) {
//             await token.deleteOne();
//         }

//         let resetToken = crypto.randomBytes(32).toString("hex");
//         const hash = await bcrypt.hash(resetToken, Number(bcrypt.genSaltSync(12)));

//         await new adminTokenModal({
//             userId: admin._id,
//             token: hash,
//             createdAt: Date.now(),
//         }).save();

//         const link = `${process.env.ADMIN_PORTAL_URL}reset-password/${admin._id}/${resetToken}`;

//         const emailHtml = `
//             <div style="background-color: rgba(231, 240, 249, 0.759); font-family: Poppins, sans-serif;">
//                 <div style="text-align: center; padding: 30px;">
//                     <h1>Password Reset</h1>
//                     <p>If you've lost your password or wish to reset it, use the link below:</p>
//                     <a href="${link}" target="_blank" style="background-color: #4E8CF7; color: #fff; padding:10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Your Password</a>
//                     <p>If you did not request a password reset, ignore this email.</p>
//                 </div>
//             </div>`;

//         const emailStatus = await sendEmail(emailHtml, admin.email, "Spireeta - Reset Password Link");

//         if (emailStatus === 200) {
//             return res.status(200).json({ message: "Password reset link sent to your email" });
//         } else {
//             return res.status(500).json({ message: "Failed to send recovery email" });
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("Something went wrong...");
//     }
// };

// // Reset Password With Token
// exports.resetPasswordWithToken = async (req, res) => {
//     try {
//         const { userId, token, password } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(userId)) {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }

//         const admin = await Admin.findById(userId);
//         if (!admin) {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }

//         const userToken = await adminTokenModal.findOne({ userId: userId });
//         if (!userToken) {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }

//         const isValid = await bcrypt.compare(token, userToken.token);
//         if (!isValid) {
//             return res.status(400).send({ error: "Invalid or expired password reset token" });
//         }

//         const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(12));

//         await Admin.findByIdAndUpdate(userId, { password: passwordHash });
//         await adminTokenModal.deleteOne({ userId: userId });

//         return res.status(200).send({ message: "Password changed successfully" });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("Something went wrong...");
//     }
// };

// // Get Super User Info
// exports.getSuperUserInfo = async (req, res) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//         const user = await Admin.findById(verifyToken._id);

//         if (!user) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         let newUser = user.toObject();
//         delete newUser.password;

//         res.status(200).json({ message: "Login Successful", data: newUser });

//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ message: "Invalid credentials" });
//     }
// };

// // Update Super Admin Password By ID
// exports.updateSuperAdminPasswordByID = async (req, res) => {
//     try {
//         const { id, password } = req.body;

//         const salt = bcrypt.genSaltSync(12);
//         const hashPassword = bcrypt.hashSync(password, salt);

//         const pass = await Admin.findById(id);
//         if (!pass) {
//             return res.status(404).send({ message: `User not found` });
//         }

//         pass.password = hashPassword;
//         await pass.save();

//         res.status(200).json({ message: "Password updated successfully" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const Admin = require("../models/user.modal.js");
const adminTokenModal = require("../models/adminToken.modal.js");
const { sendEmail } = require("../config/nodmailer.js");

// Signup Super Admin
exports.SignupSuperAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all fields properly" });
    }

    try {
        // Check if the email already exists
        const checkEmail = await Admin.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(12);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Create a new admin
        await Admin.create({ name, email, password: hashPassword });

        res.status(201).json({ message: "New user created successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Login Super Admin
// exports.LoginSuperAdmin = async (req, res) => {
//     const { email, password } = req.body;

//     // Validate input fields
//     if (!email || !password) {
//         return res.status(400).json({ message: "Please fill all fields" });
//     }

//     try {
//         // Find the admin by email
//         const admin = await Admin.findOne({ email });
//         if (!admin) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Compare passwords
//         const isMatch = await bcrypt.compare(password, admin.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid credentials" });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

//         // Return success response
//         res.status(200).json({
//             message: "Login successful",
//             data: { _id: admin._id, name: admin.name, email: admin.email },
//             token,
//         });
//     } catch (error) {
//         console.error("Login Error:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };


exports.LoginSuperAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY, { expiresIn: "1d" });

        // Skip force change for .env-managed accounts
        const isEnvManaged = email === process.env.INITIAL_ADMIN_EMAIL;
        const requiresChange = !isEnvManaged && admin.forcePasswordChange;

        res.status(200).json({
            message: requiresChange ? "Please change your password" : "Login successful",
            token,
            requiresPasswordChange: requiresChange,
            admin: admin
        });

    } catch (error) {
        console.error('[LOGIN ERROR]', error);
        res.status(500).json({ message: "Server error" });
    }
};



// Reset Password Super Admin
// exports.resetPasswordSuperAdmin = async (req, res) => {
//     const { email } = req.body;

//     // Validate input fields
//     if (!email) {
//         return res.status(400).json({ message: "Email is required" });
//     }

//     try {
//         // Find the admin by email (case-insensitive)
//         const admin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
//         if (!admin) {
//             return res.status(404).json({ message: "User does not exist" });
//         }

//         // Delete existing token if any
//         await adminTokenModal.deleteOne({ userId: admin._id });

//         // Generate a new reset token
//         const resetToken = crypto.randomBytes(32).toString("hex");
//         const hash = await bcrypt.hash(resetToken, Number(bcrypt.genSaltSync(12)));

//         // Save the new token
//         await new adminTokenModal({
//             userId: admin._id,
//             token: hash,
//             createdAt: Date.now(),
//         }).save();

//         // Create reset password link
//         const link = `${process.env.ADMIN_PORTAL_URL}reset-password/${admin._id}/${resetToken}`;
//         // const link = `https://spireeta.vercel.app/reset-password?userid=${admin._id}&Token=${resetToken}`;
//     //  const link = `https://spireeta.com/reset-password?userid=${admin._id}&Token=${resetToken}`;
       


//         // Email template
//         const emailHtml = `
//             <div style="background-color: rgba(231, 240, 249, 0.759); font-family: Poppins, sans-serif;">
//                 <div style="text-align: center; padding: 30px;">
//                     <h1>Password Reset</h1>
//                     <p>If you've lost your password or wish to reset it, use the link below:</p>
//                     <a href="${link}" target="_blank" style="background-color: #4E8CF7; color: #fff; padding:10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Your Password</a>
//                     <p>If you did not request a password reset, ignore this email.</p>
//                 </div>
//             </div>`;

//         // Send email
//         const emailStatus = await sendEmail(emailHtml, admin.email, "Spireeta - Reset Password Link");

//         if (emailStatus === 200) {
//             res.status(200).json({ message: "Password reset link sent to your email" });
//         } else {
//             res.status(500).json({ message: "Failed to send recovery email" });
//         }
//     } catch (error) {
//         console.error("Reset Password Error:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };
exports.resetPasswordSuperAdmin = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const admin = await Admin.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } });
        if (!admin) return res.status(404).json({ message: "User not found" });

        // Changed from AdminToken to adminTokenModal
        await adminTokenModal.deleteMany({ userId: admin._id });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = await bcrypt.hash(resetToken, 12);

        // Changed from AdminToken to adminTokenModal
        await new adminTokenModal({
            userId: admin._id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 // 1 hour
        }).save();

        const baseUrl = process.env.ADMIN_PORTAL_URL || 'http://5.161.61.27:5173';
        
        const link = `${baseUrl.replace(/\/$/, '')}/reset-password/${admin._id}/${resetToken}`;
        console.log(`🔗 Reset password link generated: ${link}`);

        if (!admin.email) {
            console.error("❌ Error: Admin email is undefined or empty.");
            return res.status(500).json({ message: "Email address not found" });
        }

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: #f8f9fa; padding: 30px; border-radius: 8px;">
                    <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                    <p style="color: #555; line-height: 1.6;">
                        A password reset has been requested for the admin account <b>${admin.email}</b>. Click the button below to proceed:
                    </p>
                    <div style="text-align: center; margin: 25px 0;">
                        <a href="${link}" 
                           style="background: #10b1ba; color: white; padding: 12px 24px; 
                                  text-decoration: none; border-radius: 4px; display: inline-block;
                                  font-weight: bold;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #777; font-size: 14px; line-height: 1.6;">
                        If you didn't request this, please ignore this email. This link will expire in 1 hour.
                    </p>
                </div>
            </div>`;

        // Send to admin@spireeta.com as per user request
        const targetEmail = "admin@spireeta.com";
        const emailStatus = await sendEmail(emailHtml, targetEmail, `Admin Password Reset: ${admin.email}`);

        if (emailStatus === 200) {
            return res.status(200).json({
                message: `Password reset link sent to ${targetEmail}`,
                debug_link: process.env.NODE_ENV === 'development' ? link : undefined
            });
        } else {
            return res.status(500).json({ message: "Failed to send recovery email" });
        }
    } catch (error) {
        console.error("Reset Password Error:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


// Reset Password With Token
exports.resetPasswordWithToken = async (req, res) => {
    const { userId, token, password } = req.body;

    // Validate input fields
    if (!userId || !token || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid or expired password reset token" });
        }

        // Find the admin
        const admin = await Admin.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Find the token
        const userToken = await adminTokenModal.findOne({ userId });
        if (!userToken) {
            return res.status(400).json({ message: "Invalid or expired password reset token" });
        }

        // Validate the token
        const isValid = await bcrypt.compare(token, userToken.token);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid or expired password reset token" });
        }

        // Hash the new password
        const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(12));

        // Update the admin's password
        await Admin.findByIdAndUpdate(userId, { password: passwordHash });

        // Delete the token
        await adminTokenModal.deleteOne({ userId });

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Reset Password with Token Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Get Super User Info
exports.getSuperUserInfo = async (req, res) => {
    try {
        // Extract token from headers
        const token = req.headers.authorization.split(" ")[1];
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // Find the admin
        const admin = await Admin.findById(verifyToken._id);
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Remove sensitive data
        const { password, ...userData } = admin.toObject();

        res.status(200).json({ message: "Login successful", data: userData });
    } catch (error) {
        console.error("Get User Info Error:", error);
        res.status(401).json({ message: "Invalid credentials" });
    }
};

// Update Super Admin Password By ID
exports.updateSuperAdminPasswordByID = async (req, res) => {
    const { id, password } = req.body;

    // Validate input fields
    if (!id || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find the admin
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password
        const salt = bcrypt.genSaltSync(12);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Update the password
        admin.password = hashPassword;
        await admin.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Update Password Error:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};