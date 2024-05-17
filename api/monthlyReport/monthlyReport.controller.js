const { getMonthlyReport } = require("./monthlyReport.service");

exports.getMonthlyReport = (req, res) => {
  const { startDate, endDate } = req.body; // Access parameters from request body
  console.log(startDate);
  getMonthlyReport(startDate, endDate, (error, results) => {
    if (error) {
      console.error("Error fetching monthly report:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};
