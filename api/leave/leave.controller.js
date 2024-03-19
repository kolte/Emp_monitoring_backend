const { createOrUpdateLeave,getLeaveTypeData,getLeaveDatesWithEmployeeDetails } = require("./leave.service");

module.exports = {
  createLeave: (req, res) => {
    const data = req.body;

    createOrUpdateLeave(data, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getLeaveType: (req, res) => {
    // const data = req.body;

    getLeaveTypeData((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getLeaveDatesWithDetails: (req, res) => {
    getLeaveDatesWithEmployeeDetails((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database operation error",
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  }
};
