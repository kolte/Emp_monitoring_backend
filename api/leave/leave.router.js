const express = require("express");
const router = express.Router();
const { createLeave } = require("./leave.controller");
const { getLeaveType } = require("./leave.controller");
const authenticate = require("./leave.middleware");

router.post("/", authenticate, createLeave);
router.get("/", getLeaveType);

module.exports = router;
