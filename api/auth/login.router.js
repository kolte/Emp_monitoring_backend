const router = require("express").Router();
const { login,authenticate } = require("./login.controller");

router.post("/", login);
router.post("/auth", authenticate);

module.exports = router;
