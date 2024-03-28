const express = require('express');
const router = express.Router();
const moduleController = require('./module.controller');
const authenticate = require("./authenticate.middleware");

router.get('/',authenticate, moduleController.getAllModules);
router.get('/:id',authenticate, moduleController.getModuleById);
router.post('/',authenticate, moduleController.createModule);
router.put('/:id',authenticate, moduleController.updateModule);
router.delete('/:id',authenticate, moduleController.deleteModule);

module.exports = router;
