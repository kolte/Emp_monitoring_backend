const router = require("express").Router();
const { getUsers,getTimeData } = require("./UserData.controller");
const authenticate = require("./authenticate.middleware");

router.get("/", authenticate, getUsers);
router.post("/", authenticate, getTimeData);

module.exports = router;
