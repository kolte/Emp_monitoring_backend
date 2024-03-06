const router = require("express").Router();
const { getTotalWorkingHoursToday, getTotalWorkingHoursThisMonth, compareMonthHours,compareWeekHours } = require("./dashboard.controller");

router.get("/today", getTotalWorkingHoursToday);
router.get("/month", getTotalWorkingHoursThisMonth);
router.get('/compareMonth', compareMonthHours);
router.get('/compareWeek', compareWeekHours);

module.exports = router;
