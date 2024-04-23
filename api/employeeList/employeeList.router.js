const router = require("express").Router();
const { getUsers, getEmployeeAttendanceCount } = require("./employeeList.controller");
const authenticate = require("./authenticate.middleware");

// Route to get users
router.get("/", authenticate, getUsers);

// Route to get employee attendance count
router.get("/attendance/count", authenticate, getEmployeeAttendanceCount);

module.exports = router;
