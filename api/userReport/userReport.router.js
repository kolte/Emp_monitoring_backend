const router = require("express").Router();
const { getUsers,getUsersPunchReport } = require("./userReport.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.get("/punchin", authenticate, getUsersPunchReport);

module.exports = router;
