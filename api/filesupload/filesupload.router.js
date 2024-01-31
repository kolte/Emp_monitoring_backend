const router = require("express").Router();
const { fileUpload } = require("./filesupload.controller");
const authenticate = require("./authenticate.middleware");

router.post("/",authenticate, fileUpload);

module.exports = router;
