// Import necessary modules and setup database connection if required
const pool = require('../../config/database'); // Assuming you have a database connection pool set up

module.exports = {
  getCommentsByTaskId: (taskId, callback) => {
    const query = 'SELECT * FROM em_job_comments WHERE task_id = ?';
    pool.query(query, [taskId], (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  createComment: (commentData, callback) => {
    const { task_id, user_id, comment_text } = commentData;
    const query = 'INSERT INTO em_job_comments (task_id, user_id, comment_text) VALUES (?, ?, ?)';
    pool.query(query, [task_id, user_id, comment_text], (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.insertId);
    });
  },

  updateComment: (commentId, commentData, callback) => {
    const { comment_text } = commentData;
    const query = 'UPDATE em_job_comments SET comment_text = ? WHERE comment_id = ?';
    pool.query(query, [comment_text, commentId], (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  },

  deleteComment: (commentId, callback) => {
    const query = 'DELETE FROM em_job_comments WHERE comment_id = ?';
    pool.query(query, [commentId], (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results.affectedRows);
    });
  }
};
