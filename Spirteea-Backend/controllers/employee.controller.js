// import Employee from "../models/employee.modal.js";

// // Create a new employee
// // export const createEmployee = async (req, res) => {
// //     try {
// //         const newEmployee = new Employee(req.body);
// //         await newEmployee.save();
// //         res.status(200).json({ message: "Employee created successfully", data: newEmployee });
// //     } catch (error) {
// //         res.status(500).json({ message: "Error creating employee", error });
// //     }
// // };
// export const createEmployee = async (req, res) => {
//     try {
//         let newEmployeeID;
//         let existingEmployee;

//         do {
//             // Fetch the latest employee to determine the next employeeID
//             const latestEmployee = await Employee.findOne().sort({ createdAt: -1 });

//             if (latestEmployee) {
//                 // Extract the numeric part from the last employeeID and increment it
//                 const lastID = parseInt(latestEmployee.employeeID.split("-")[1], 10);
//                 newEmployeeID = `spt-${lastID + 1}`;
//             } else {
//                 // Default ID if there are no employees yet
//                 newEmployeeID = "spt-101";
//             }

//             // Check if the generated employeeID already exists
//             existingEmployee = await Employee.findOne({ employeeID: newEmployeeID });

//         } while (existingEmployee); // Continue regenerating until a unique ID is found

//         // Create a new employee instance with the unique employeeID
//         const newEmployee = new Employee({ ...req.body, employeeID: newEmployeeID });

//         // Save the new employee to the database
//         await newEmployee.save();

//         // Return success response
//         res.status(200).json({ message: "Employee created successfully", data: newEmployee });
//     } catch (error) {
//         // Return error response
//         res.status(500).json({ message: "Error creating employee", error: error.message });
//     }
// };

// // Get all employees
// export const getEmployees = async (req, res) => {
//     try {
//         const employees = await Employee.find({ deletedAt: null });
//         res.status(200).json({ message: "Employees fetched successfully", data: employees });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching employees", error });
//     }
// };

// // Get a single employee by ID
// export const getEmployeebyid = async (req, res) => {
//     try {
//         const employee = await Employee.findById(req.params.id);
//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }
//         res.status(200).json({ message: "Employee fetched successfully", data: employee });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching employee", error });
//     }
// };

// // Update an employee by ID
// export const updateEmployee = async (req, res) => {
//     try {
//         const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!employee) {
//             return res.status(404).json({ message: "Employee not found" });
//         }
//         res.status(200).json({ message: "Employee updated successfully", data: employee });
//     } catch (error) {
//         res.status(500).json({ message: "Error updating employee", error });
//     }
// };

// // Get all soft-deleted employees
// export const getDeletedEmployees = async (req, res) => {
//     try {
//         const employees = await Employee.find({ deletedAt: { $ne: null } });
//         res.status(200).json({ message: "Deleted employees fetched successfully", data: employees });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching deleted employees", error });
//     }
// };

// export const deleteEmployee = async (req, res) => {
//     try {
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing employee IDs" });
//         }

//         // Fetch all employees to be soft-deleted and filter out the ones that do not exist
//         const employeesToDelete = await Employee.find({ _id: { $in: ids } });
//         const validIds = employeesToDelete.map(employee => employee._id);

//         // Perform the update for the valid IDs to set the deletedAt field
//         const result = await Employee.updateMany(
//             { _id: { $in: validIds } },
//             { $set: { deletedAt: new Date() } }
//         );

//         if (result.nModified === 0) {
//             return res.status(404).json({ message: "No employees found to delete" });
//         }

//         return res.status(200).json({
//             message: "Employees marked as deleted successfully",
//             deletedEmployees: validIds,
//         });
//     } catch (error) {
//         console.error("Error marking employees as deleted:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

// // Controller to permanently delete employees
// export const permanentDeleteEmployee = async (req, res) => {
//     try {
//         // console.log(req.body)
//         const { ids } = req.body;

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ message: "Invalid or missing employee IDs" });
//         }

//         // Fetch all employees to be deleted and filter out the ones that do not exist
//         const employeesToDelete = await Employee.find({ _id: { $in: ids } });
//         const validIds = employeesToDelete.map(employee => employee._id);

//         // Perform the deletion for the valid IDs
//         const result = await Employee.deleteMany({ _id: { $in: validIds } });

//         if (result.deletedCount === 0) {
//             return res.status(404).json({ message: "No employees found to delete" });
//         }

//         return res.status(200).json({
//             message: "Employees deleted successfully",
//             deletedEmployees: validIds,
//         });
//     } catch (error) {
//         console.error("Error permanently deleting employees:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const Employee = require("../models/employee.modal.js");

// Create a new employee
exports.createEmployee = async (req, res) => {
    try {
        let newEmployeeID;
        let existingEmployee;

        do {
            // Fetch the latest employee to determine the next employeeID
            const latestEmployee = await Employee.findOne().sort({ createdAt: -1 });

            if (latestEmployee) {
                // Extract the numeric part from the last employeeID and increment it
                const lastID = parseInt(latestEmployee.employeeID.split("-")[1], 10);
                newEmployeeID = `spt-${lastID + 1}`;
            } else {
                // Default ID if there are no employees yet
                newEmployeeID = "spt-101";
            }

            // Check if the generated employeeID already exists
            existingEmployee = await Employee.findOne({ employeeID: newEmployeeID });

        } while (existingEmployee); // Continue regenerating until a unique ID is found

        // Create a new employee instance with the unique employeeID
        const newEmployee = new Employee({ ...req.body, employeeID: newEmployeeID });

        // Save the new employee to the database
        await newEmployee.save();

        // Return success response
        res.status(200).json({ message: "Employee created successfully", data: newEmployee });
    } catch (error) {
        // Return error response
        res.status(500).json({ message: "Error creating employee", error: error.message });
    }
};

// Get all employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ deletedAt: null });
        res.status(200).json({ message: "Employees fetched successfully", data: employees });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employees", error });
    }
};

// Get a single employee by ID
exports.getEmployeebyid = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee fetched successfully", data: employee });
    } catch (error) {
        res.status(500).json({ message: "Error fetching employee", error });
    }
};

// Update an employee by ID
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee updated successfully", data: employee });
    } catch (error) {
        res.status(500).json({ message: "Error updating employee", error });
    }
};

// Get all soft-deleted employees
exports.getDeletedEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({ deletedAt: { $ne: null } });
        res.status(200).json({ message: "Deleted employees fetched successfully", data: employees });
    } catch (error) {
        res.status(500).json({ message: "Error fetching deleted employees", error });
    }
};

// Soft delete employees
exports.deleteEmployee = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing employee IDs" });
        }

        // Fetch all employees to be soft-deleted and filter out the ones that do not exist
        const employeesToDelete = await Employee.find({ _id: { $in: ids } });
        const validIds = employeesToDelete.map(employee => employee._id);

        // Perform the update for the valid IDs to set the deletedAt field
        const result = await Employee.updateMany(
            { _id: { $in: validIds } },
            { $set: { deletedAt: new Date() } }
        );

        if (result.nModified === 0) {
            return res.status(404).json({ message: "No employees found to delete" });
        }

        return res.status(200).json({
            message: "Employees marked as deleted successfully",
            deletedEmployees: validIds,
        });
    } catch (error) {
        console.error("Error marking employees as deleted:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Permanently delete employees
exports.permanentDeleteEmployee = async (req, res) => {
    try {
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing employee IDs" });
        }

        // Fetch all employees to be deleted and filter out the ones that do not exist
        const employeesToDelete = await Employee.find({ _id: { $in: ids } });
        const validIds = employeesToDelete.map(employee => employee._id);

        // Perform the deletion for the valid IDs
        const result = await Employee.deleteMany({ _id: { $in: validIds } });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No employees found to delete" });
        }

        return res.status(200).json({
            message: "Employees deleted successfully",
            deletedEmployees: validIds,
        });
    } catch (error) {
        console.error("Error permanently deleting employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Restore deleted employees
exports.restoreEmployee = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "Invalid or missing IDs" });
        }
        await Employee.updateMany({ _id: { $in: ids } }, { $set: { deletedAt: null } });
        res.status(200).json({ message: "Employees restored successfully" });
    } catch (error) {
        console.error("Error restoring employees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
