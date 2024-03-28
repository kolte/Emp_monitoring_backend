const express = require("express");
const router = express.Router();
const { createLeave, getLeaveType, getLeaveDatesWithDetails, updateLeaveDetails, getApprovedLeaveDatesWithDetails, getDeniedLeaveDatesWithDetails } = require("./leave.controller");
const authenticate = require("./leave.middleware");

router.post("/", authenticate, createLeave);
router.get("/", authenticate, getLeaveType);
router.get("/leave-dates", authenticate, getLeaveDatesWithDetails);
router.get("/approved-leave-dates", authenticate, getApprovedLeaveDatesWithDetails);
router.get("/denied-leave-dates", authenticate, getDeniedLeaveDatesWithDetails);
router.put("/update-leave", authenticate, updateLeaveDetails); // Add route for updating leave details

module.exports = router;
