const express = require('express');
const router = express.Router();
const { createAttendance } = require("./employeeAttendance.controller");
const authenticate = require("./authenticate.middleware");

router.post("/", authenticate, createAttendance);

module.exports = router;
