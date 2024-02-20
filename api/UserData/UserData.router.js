const router = require("express").Router();
const { getUsers } = require("./UserData.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);

module.exports = router;
