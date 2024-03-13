const router = require("express").Router();
const { createUser, getUsers, updateUserDetails, deleteUser, updateProfilePicture, getProfilePicture } = require("./employee.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateUserDetails);
router.delete("/:id", authenticate, deleteUser);
router.post("/profile-picture/:id", authenticate, updateProfilePicture);
router.get('/profilePic/:id', authenticate, getProfilePicture);

module.exports = router;
