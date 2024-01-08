const router = require("express").Router();
const { createUser, getUsers } = require("./user.controller");

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
