// import express from "express";
// import authenticate from "../middleware/authenticate.js";
// import { createEmployee, deleteEmployee, getDeletedEmployees, getEmployeebyid, getEmployees, permanentDeleteEmployee, updateEmployee } from "../controllers/employee.controller.js";

// const router = express.Router();

// router.post('/createEmployee', authenticate, createEmployee);

// router.get('/getEmployees', authenticate, getEmployees);

// router.get('/getDeletedEmployees', authenticate, getDeletedEmployees);

// router.get('/getEmployeebyid/:id', authenticate, getEmployeebyid);

// router.put('/updateEmployee/:id', authenticate, updateEmployee);

// router.post('/softDeleteEmployee', authenticate, deleteEmployee);

// router.post('/permanentDeleteEmployee', authenticate, permanentDeleteEmployee);


// export default router;
const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const {
    createEmployee,
    deleteEmployee,
    getDeletedEmployees,
    getEmployeebyid,
    getEmployees,
    permanentDeleteEmployee,
    updateEmployee,
    restoreEmployee
} = require("../controllers/employee.controller.js");

const router = express.Router();

router.post('/createEmployee', authenticate, createEmployee);
router.get('/getEmployees', authenticate, getEmployees);
router.get('/getDeletedEmployees', authenticate, getDeletedEmployees);
router.get('/getEmployeebyid/:id', authenticate, getEmployeebyid);
router.put('/updateEmployee/:id', authenticate, updateEmployee);
router.post('/softDeleteEmployee', authenticate, deleteEmployee);
router.post('/permanentDeleteEmployee', authenticate, permanentDeleteEmployee);
router.post('/restoreEmployee', authenticate, restoreEmployee);

module.exports = router;
