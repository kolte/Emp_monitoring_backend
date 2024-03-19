const express = require("express");
const router = express.Router();
const { createLeave, getLeaveType, getLeaveDatesWithDetails } = require("./leave.controller");
const authenticate = require("./leave.middleware");

router.post("/", authenticate, createLeave);
router.get("/", getLeaveType);
router.get("/leave-dates", getLeaveDatesWithDetails);

module.exports = router;
