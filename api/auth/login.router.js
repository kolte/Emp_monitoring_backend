const router = require("express").Router();
const { login,authenticate,refreshToken } = require("./login.controller");

router.post("/", login);
router.post("/auth", authenticate);
router.post("/refresh", refreshToken);

module.exports = router;
