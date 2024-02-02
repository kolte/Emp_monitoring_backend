const { create, getUsers, updateUser } = require("./employee.service");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: 'Database operation error',
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  updateUserDetails: (req, res) => {
    const body = req.body;
    const userId = req.params.id;

    updateUser(userId, body, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        message: 'Employee details updated successfully',
        data: results,
      });
    });
  },
};
