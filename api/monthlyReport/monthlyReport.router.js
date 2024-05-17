const express = require("express");
const router = require("express").Router();
const { getMonthlyReport,getAttendanceData } = require("./monthlyReport.controller");
const authenticate = require("./authenticate.middleware");

router.post("/", authenticate, getMonthlyReport);
router.post('/attendance-data', authenticate, getAttendanceData);

module.exports = router;
