const router = require("express").Router();
const { createUser, getUsers, updateUserDetails, deleteUser } = require("./employee.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUserDetails);
router.delete("/:id", authenticate, deleteUser);


module.exports = router;
