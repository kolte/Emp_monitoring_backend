const express = require('express');
const router = express.Router();
const TaskController = require('./task.controller');

router.post('/', TaskController.createTask);
router.get('/', TaskController.getAllTasks);
router.get('/:id', TaskController.getTaskById);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

// Other routes for assigning task, adding comments, changing status, etc.

module.exports = router;
