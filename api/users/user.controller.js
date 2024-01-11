const { create,getUsers } = require("./user.service");


module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    create(body, (err, results) => {
      if (err) {
        console.error('Database error:', err); // Log the error for debugging purposes
        return res.status(500).json({
          success: 0,
          message: err.message || 'Database operation error', // Send the specific error message
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
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }
};
