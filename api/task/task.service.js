const pool = require('../../config/database');

module.exports = {
  getAllTasks: (callback) => {
    pool.query('SELECT * FROM em_job_tasks', (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results);
    });
  },

  getTaskById: (taskId, callback) => {
    pool.query('SELECT * FROM em_job_tasks WHERE task_id = ?', [taskId], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results[0]);
    });
  },

  createTask: (taskData, callback) => {
    pool.query('INSERT INTO em_job_tasks SET ?', [taskData], (error, results, fields) => {
      if (error) {
        console.log(error);
        return callback(error);
      }
      return callback(null, results.insertId);
    });
  },

  updateTask: (taskId, taskData, callback) => {
    pool.query('UPDATE em_job_tasks SET ? WHERE task_id = ?', [taskData, taskId], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results.changedRows);
    });
  },

  deleteTask: (taskId, callback) => {
    pool.query('DELETE FROM em_job_tasks WHERE task_id = ?', [taskId], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, results.affectedRows);
    });
  }
};
