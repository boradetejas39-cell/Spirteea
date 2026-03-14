
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const router = require("./routes/routes.js");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
dotenv.config({ path: ".env" });

// Allowed Origins for CORS
const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://spireeta.com",
    "https://www.spireeta.com",
    "https://spirteea.vercel.app"
];

// CORS Middleware – allow any localhost/127.0.0.1 origin in development
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) return callback(null, true);
            // Allow any localhost or 127.0.0.1 (any port) for dev
            if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
                return callback(null, true);
            }
            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 6000;
const uri = process.env.ATLAS_URI;

if (!uri) {
    console.error("MongoDB URI is missing! Check your .env file.");
    process.exit(1);
}

// Admin Model Definition (Safe for multiple requires)
let Admin;
function initializeAdminModel() {
    if (!Admin) {
        if (mongoose.models.Admin) {
            Admin = mongoose.model('Admin');
        } else {
            const adminSchema = new mongoose.Schema({
                email: { type: String, required: true, unique: true },
                password: { type: String, required: true },
                name: { type: String, default: "System Admin" },
                forcePasswordChange: { type: Boolean, default: false }
            });
            Admin = mongoose.model('Admin', adminSchema);
        }
    }
    return Admin;
}

// Password Synchronization Function
async function syncAdminCredentials() {
    if (!process.env.INITIAL_ADMIN_EMAIL || !process.env.INITIAL_ADMIN_PASSWORD) {
        console.log("[CREDENTIALS] No admin credentials in .env");
        return;
    }

    try {
        const Admin = initializeAdminModel();
        const hashedPassword = await bcrypt.hash(process.env.INITIAL_ADMIN_PASSWORD, 12);
        
        await Admin.findOneAndUpdate(
            { email: process.env.INITIAL_ADMIN_EMAIL },
            { 
                $set: { 
                    password: hashedPassword,
                    forcePasswordChange: false 
                },
                $setOnInsert: {
                    name: "System Admin",
                    email: process.env.INITIAL_ADMIN_EMAIL
                }
            },
            { upsert: true }
        );

        console.log(`[CREDENTIALS] Credentials synchronized for ${process.env.INITIAL_ADMIN_EMAIL}`);
    } catch (error) {
        console.error("[CREDENTIALS ERROR]", error.message);
    }
}

// Database Connection with Enhanced Settings
mongoose.connect(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000
})
.then(() => {
    console.log("Connected to MongoDB");
    
    // Initial sync
    syncAdminCredentials();
    
    // Periodic sync (every 6 hours)
    const syncInterval = setInterval(syncAdminCredentials, 6 * 60 * 60 * 1000);
    
    // Cleanup on exit
    process.on('SIGINT', () => {
        clearInterval(syncInterval);
        mongoose.connection.close();
        process.exit(0);
    });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Admin email: ${process.env.INITIAL_ADMIN_EMAIL}`);
    });
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});