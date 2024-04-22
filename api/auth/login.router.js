const router = require("express").Router();
const { login, authenticate, refreshToken, resetPassword } = require("./login.controller");

router.post("/", login);
router.post("/auth", authenticate);
router.post("/refresh", refreshToken);
router.post("/reset-password", resetPassword);

module.exports = router;
