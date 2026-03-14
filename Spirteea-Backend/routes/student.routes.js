// import express from "express";
// import authenticate from "../middleware/authenticate.js";
// import { createStudent, deleteStudent, getAllDeletedStudents, getStudentById, getStudents, permanentDeleteStudents, restoreStudent, updateStudent } from "../controllers/student.controller.js";

// const router = express.Router();

// //dashboard
// // router.post('/createStudent', authenticate, createStudent);
// router.post('/createStudent', createStudent);

// // router.get('/getStudents', authenticate, getStudents);
// router.get('/getStudents', authenticate,getStudents);

// // router.get('/getStudentById/:id', authenticate, getStudentById);
// router.get('/getStudentById/:id',authenticate, getStudentById);

// // router.put('/updateStudent/:id', authenticate, updateStudent);
// router.put('/updateStudent/:id',authenticate, updateStudent);

// // router.delete('/softdeleteStudent', authenticate, deleteStudent);
// router.post('/softdeleteStudent',authenticate, deleteStudent);

// // router.post("/permanentDeleteStudents", authenticate, permanentDeleteStudents);
// router.post("/permanentDeleteStudents",authenticate, permanentDeleteStudents);


// router.get('/getAllDeletedStudents', authenticate, getAllDeletedStudents);

// // restoreEnquiry
// router.post('/restoreStudent', authenticate, restoreStudent);


// export default router;
const express = require("express");
const authenticate = require("../middleware/authenticate.js");
const { 
    createStudent, 
    deleteStudent, 
    getAllDeletedStudents, 
    getStudentById, 
    getStudents, 
    permanentDeleteStudents, 
    restoreStudent, 
    updateStudent 
} = require("../controllers/student.controller.js");

const router = express.Router();

//dashboard
router.post('/createStudent', createStudent);
router.get('/getStudents', authenticate, getStudents);
router.get('/getStudentById/:id', authenticate, getStudentById);
router.put('/updateStudent/:id', authenticate, updateStudent);
router.post('/softdeleteStudent', authenticate, deleteStudent);
router.post("/permanentDeleteStudents", authenticate, permanentDeleteStudents);
router.get('/getAllDeletedStudents', authenticate, getAllDeletedStudents);
router.post('/restoreStudent', authenticate, restoreStudent);

module.exports = router;
