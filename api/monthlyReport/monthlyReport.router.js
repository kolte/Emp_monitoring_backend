const express = require("express");
const router = require("express").Router();
const { getMonthlyReport } = require("./monthlyReport.controller");
const authenticate = require("./authenticate.middleware");

router.post("/", authenticate, getMonthlyReport);

module.exports = router;
