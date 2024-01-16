const router = require("express").Router();
const { createUser, getUsers } = require("./employee.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.post("/", authenticate, createUser);

module.exports = router;
