const express = require("express");
const router = require("express").Router();
const { getUsers,getUsersPunchReport,getEmployeeScreenshots, getLatestFourScreenshots,getTimeReport } = require("./userReport.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.get("/punchin", authenticate, getUsersPunchReport);
router.get("/timereport", authenticate, getTimeReport);
router.get("/screenshots", authenticate, getEmployeeScreenshots);
router.get("/latest-screenshots", authenticate, getLatestFourScreenshots);

module.exports = router;
