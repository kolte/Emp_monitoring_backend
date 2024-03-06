const express = require('express');
const router = express.Router();
const commentController = require('./comment.controller');

router.get('/:taskId', commentController.getCommentsByTaskId);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;
