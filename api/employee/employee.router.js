const router = require("express").Router();
const { createUser, getUsers, updateUserDetails } = require("./employee.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUserDetails);

module.exports = router;
