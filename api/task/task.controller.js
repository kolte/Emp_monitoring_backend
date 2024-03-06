const taskService = require('./task.service');

module.exports = {
  getAllTasks: (req, res) => {
    taskService.getAllTasks((error, tasks) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.status(200).json({ success: 1, tasks });
    });
  },

  getTaskById: (req, res) => {
    const taskId = req.params.id;
    taskService.getTaskById(taskId, (error, task) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (!task) {
        return res.status(404).json({ success: 0, message: 'Task not found' });
      }
      return res.status(200).json({ success: 1, task });
    });
  },

  createTask: (req, res) => {
    // Validate request body
    const { project_id, task_name, assignee_id, reporter_id, priority, status, due_date } = req.body;
    if (!project_id || !task_name || !assignee_id || !reporter_id || !priority || !status) {
      return res.status(400).json({ success: 0, message: 'Missing required fields' });
    }

    // You can add more detailed validation here if needed

    const taskData = req.body;
    taskService.createTask(taskData, (error, taskId) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.status(201).json({ success: 1, message: 'Task created successfully', taskId });
    });
  },

  updateTask: (req, res) => {
    const taskId = req.params.id;
    const taskData = req.body;

    // Validate request body
    if (Object.keys(taskData).length === 0) {
      return res.status(400).json({ success: 0, message: 'No data provided for update' });
    }

    taskService.updateTask(taskId, taskData, (error, numRowsAffected) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (numRowsAffected === 0) {
        return res.status(404).json({ success: 0, message: 'Task not found or no changes made' });
      }
      return res.status(200).json({ success: 1, message: 'Task updated successfully' });
    });
  },

  deleteTask: (req, res) => {
    const taskId = req.params.id;
    taskService.deleteTask(taskId, (error, numRowsAffected) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (numRowsAffected === 0) {
        return res.status(404).json({ success: 0, message: 'Task not found' });
      }
      return res.status(200).json({ success: 1, message: 'Task deleted successfully' });
    });
  }
};
