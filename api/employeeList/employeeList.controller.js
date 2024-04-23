const { getUsers } = require("./employeeList.service");
const { getEmployeeAttendanceCount } = require("./employeeList.service");

module.exports = {
  getUsers: (req, res) => {
    const { employeeId } = req.query;
    getUsers(employeeId, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },

  getEmployeeAttendanceCount: (req, res) => {
    getEmployeeAttendanceCount((err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Internal server error",
        });
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  }
};
