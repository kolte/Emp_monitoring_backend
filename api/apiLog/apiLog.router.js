const express = require('express');
const router = express.Router();
const { logApiActivityController } = require('./apiLog.controller');

router.post('/apiActivities', logApiActivityController);

module.exports = router;

