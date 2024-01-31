const router = require("express").Router();
const { fileUpload } = require("./filesupload.controller");
const authenticate = require("./authenticate.middleware");
const { check } = require("express-validator");

router.post("/", fileUpload);

module.exports = router;
