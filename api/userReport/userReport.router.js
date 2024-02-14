const express = require("express");
const router = require("express").Router();
const { getUsers,getUsersPunchReport,getEmployeeScreenshots, getLatestFourScreenshots } = require("./userReport.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.get("/punchin", authenticate, getUsersPunchReport);
router.get("/screenshots", authenticate, getEmployeeScreenshots);
router.get("/latest-screenshots", authenticate, getLatestFourScreenshots);

module.exports = router;
