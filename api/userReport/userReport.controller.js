const { getUsers ,getUsersPunchReport} = require("./userReport.service");

module.exports = {
  getUsers: (req, res) => {
    const { employeeId } = req.query;
    getUsers(employeeId,(err, results) => {
      if (err) {
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
  getUsersPunchReport: (req, res) => {
    const { employeeId } = req.query;
    getUsersPunchReport(employeeId,(err, results) => {
      if (err) {
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
