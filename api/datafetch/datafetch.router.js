// datafetch.router.js
const express = require('express');
const router = express.Router();
const datafetchController = require('./datafetch.controller');

router.get('/employee-details', datafetchController.getEmployeeDetails);
router.get('/departments', datafetchController.getDepartments);
router.get('/jobs', datafetchController.getJobs);
router.get('/users', datafetchController.getUsers);
router.get("/attendance", datafetchController.getLatestAttendance);
router.get("/activitylog", datafetchController.getLogActivity);
router.get("/employeeActivity", datafetchController.employeeActivity);

module.exports = router;
