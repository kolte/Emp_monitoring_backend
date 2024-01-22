const express = require("express");
const router = express.Router();
const { createLeave } = require("./leave.controller");
const authenticate = require("./leave.middleware");

router.post("/", authenticate, createLeave);

module.exports = router;
