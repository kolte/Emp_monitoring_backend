const commentService = require('./comment.service');

module.exports = {
  getCommentsByTaskId: (req, res) => {
    const taskId = req.params.taskId;
    commentService.getCommentsByTaskId(taskId, (error, comments) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.status(200).json({ success: 1, comments });
    });
  },

  createComment: (req, res) => {
    const commentData = req.body;
    commentService.createComment(commentData, (error, commentId) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.status(201).json({ success: 1, message: 'Comment created successfully', commentId });
    });
  },

  updateComment: (req, res) => {
    const commentId = req.params.id;
    const commentData = req.body;
    commentService.updateComment(commentId, commentData, (error, numRowsAffected) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (numRowsAffected === 0) {
        return res.status(404).json({ success: 0, message: 'Comment not found or no changes made' });
      }
      return res.status(200).json({ success: 1, message: 'Comment updated successfully' });
    });
  },

  deleteComment: (req, res) => {
    const commentId = req.params.id;
    commentService.deleteComment(commentId, (error, numRowsAffected) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      if (numRowsAffected === 0) {
        return res.status(404).json({ success: 0, message: 'Comment not found' });
      }
      return res.status(200).json({ success: 1, message: 'Comment deleted successfully' });
    });
  }
};
