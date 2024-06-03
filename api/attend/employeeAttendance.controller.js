const { createOrUpdateAttendance, tokenNullAttendance } = require("./employeeAttendance.service");

module.exports = {
  createAttendance: (req, res) => {
    const data = req.body;

    createOrUpdateAttendance(data, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: 'Database operation error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        data_send: data,
      });
    });
  },
  nullAttendance: (req, res) => {
    const data = req.body;

    tokenNullAttendance(data, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: 'Database operation error',
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};