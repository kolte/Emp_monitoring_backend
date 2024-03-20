const express = require('express');
const router = express.Router();
const { createAttendance, nullAttendance } = require("./employeeAttendance.controller");
const authenticate = require("./authenticate.middleware");

router.post("/", authenticate, createAttendance);
router.post("/nullAttendance", nullAttendance);

module.exports = router;
