// import jwt from "jsonwebtoken";
// import Admin from '../models/user.modal.js'

// const authenticate = async (req, res, next) => {
//   try {
//     // console.log(req.headers.authorization.split(" ")[1]);
//     // const token = req.headers.authorization
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       throw new Error("Unauthorized: No token provided");
//     }

//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

//     if (!verifyToken || !verifyToken._id) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     const adminUser = await Admin.findById(verifyToken._id);

//     if (!adminUser) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     if (!adminUser) {
//       throw new Error("Unauthorized: Invalid token");
//     }
//     req.token = token;
//     req.adminUser = adminUser;
//     req.adminID = adminUser._id;
//     next();
//   } catch (err) {
//     console.log(err);
//     res.clearCookie("JWT_TOKEN");
//     res.status(401).send({ error: "Unauthorized" });
//   }
// };

// export default authenticate;
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/user.modal.js");

// const authenticate = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

//     if (!verifyToken || !verifyToken._id) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     const adminUser = await Admin.findById(verifyToken._id);

//     if (!adminUser) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     req.token = token;
//     req.adminUser = adminUser;
//     req.adminID = adminUser._id;
//     next();
//   } catch (err) {
//     console.error("Authentication Error:", err);
//     res.clearCookie("JWT_TOKEN");
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// module.exports = authenticate;
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/user.modal.js");

// const authenticate = async (req, res, next) => {
//   try {
//     console.log("ðŸ”¹ Incoming Request Headers:", req.headers); // Debugging Step

//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       console.error("ðŸš¨ Authorization header is missing!");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       console.error("ðŸš¨ Token is missing in the Authorization header!");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//     console.log("ðŸ”¹ Decoded Token:", verifyToken); // Debugging Step

//     if (!verifyToken || !verifyToken._id) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     const adminUser = await Admin.findById(verifyToken._id);

//     if (!adminUser) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     req.token = token;
//     req.adminUser = adminUser;
//     req.adminID = adminUser._id;
//     next();
//   } catch (err) {
//     console.error("ðŸš¨ Authentication Error:", err);
//     res.clearCookie("JWT_TOKEN");
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// // module.exports = authenticate;
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/user.modal.js");

// const authenticate = async (req, res, next) => {
//   try {
//     console.log("🔹 Incoming Request Headers:", req.headers); // Debugging Step

//     // ✅ Allow Public Routes Without Authentication
//     if (req.path === "/health-check") {
//       return next(); // Skip authentication for this route
//     }

//     const authHeader = req.headers.authorization;
//     if (!authHeader) {
//       console.error("🚨 Authorization header is missing!");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       console.error("🚨 Token is missing in the Authorization header!");
//       return res.status(401).json({ error: "Unauthorized: No token provided" });
//     }

//     const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
//     console.log("🔹 Decoded Token:", verifyToken); // Debugging Step

//     if (!verifyToken || !verifyToken._id) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     const adminUser = await Admin.findById(verifyToken._id);
//     if (!adminUser) {
//       return res.status(401).json({ error: "Unauthorized: Invalid token" });
//     }

//     req.token = token;
//     req.adminUser = adminUser;
//     req.adminID = adminUser._id;
//     next();
//   } catch (err) {
//     console.error("🚨 Authentication Error:", err);
//     res.clearCookie("JWT_TOKEN");
//     res.status(401).json({ error: "Unauthorized" });
//   }
// };

// module.exports = authenticate;
const jwt = require("jsonwebtoken");
const Admin = require("../models/user.modal.js");

const authenticate = async (req, res, next) => {
  try {
    console.log("🔹 Incoming Request Headers:", req.headers);

    // ✅ Allow Public Routes Without Authentication
    const publicRoutes = ["/health-check", "/public-endpoint"]; // Add more routes if needed
    if (publicRoutes.includes(req.path)) {
      return next();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("🚨 Missing or invalid Authorization header!");
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.error("🚨 Token is missing in the Authorization header!");
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    // ✅ Safe JWT verification
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      console.error("🚨 Invalid or expired token:", error.message);
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    console.log("🔹 Decoded Token:", verifyToken);

    if (!verifyToken || !verifyToken._id) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // ✅ Handle invalid user ID properly
    const adminUser = await Admin.findById(verifyToken._id).catch((err) => {
      console.error("🚨 Database Error:", err);
      return null;
    });

    if (!adminUser) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    req.token = token;
    req.adminUser = adminUser;
    req.adminID = adminUser._id;
    next();
  } catch (err) {
    console.error("🚨 Authentication Error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = authenticate;


