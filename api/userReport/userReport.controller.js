const { getUsers ,getUsersPunchReport,getEmployeeScreenshots, getLatestFourScreenshots,getTimeReport } = require("./userReport.service");

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

exports.getTimeReport = (req, res) => {
  const { employeeId } = req.query;
  const { date } = req.query;
  getTimeReport(employeeId,date, (error, results) => {
    if (error) {
      console.error("Error fetching users punch report:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};

exports.getEmployeeScreenshots = (req, res) => {
  const { employeeId, date, page = 0, pageSize = 15 } = req.query;

  // Convert page and pageSize to integers
  const pageInt = parseInt(page, 10);
  const pageSizeInt = parseInt(pageSize, 10);

  getEmployeeScreenshots(employeeId, date, pageInt, pageSizeInt, (error, results) => {
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
