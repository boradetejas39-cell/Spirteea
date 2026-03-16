const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Employee = require('./models/employee.modal');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/spireeta";

async function checkDeletedEmployees() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to MongoDB");

        const deletedCount = await Employee.countDocuments({ deletedAt: { $ne: null } });
        console.log("Deleted Employees Count:", deletedCount);

        const allDeleted = await Employee.find({ deletedAt: { $ne: null } });
        console.log("Deleted Employees:", allDeleted.map(e => ({ name: e.name, deletedAt: e.deletedAt })));

        await mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
    }
}

checkDeletedEmployees();
