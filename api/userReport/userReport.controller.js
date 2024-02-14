const { getUsers ,getUsersPunchReport,getEmployeeScreenshots, getLatestFourScreenshots } = require("./userReport.service");

exports.getUsers = (req, res) => {
  const { employeeId } = req.query;
  getUsers(employeeId, (error, results) => {
    if (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};

exports.getUsersPunchReport = (req, res) => {
  const { employeeId } = req.query;
  getUsersPunchReport(employeeId, (error, results) => {
    if (error) {
      console.error("Error fetching users punch report:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};

exports.getEmployeeScreenshots = (req, res) => {
  const { employeeId, date } = req.query;
  getEmployeeScreenshots(employeeId, date, (error, results) => {
    if (error) {
      console.error("Error fetching employee screenshots:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};

exports.getLatestFourScreenshots = (req, res) => {
  const { employeeId } = req.query;
  getLatestFourScreenshots(employeeId, (error, results) => {
    if (error) {
      console.error("Error fetching latest four screenshots:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};
