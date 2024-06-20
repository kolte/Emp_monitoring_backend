const { getMonthlyReport, getAttendanceData, getDashoardGraph } = require("./monthlyReport.service");

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

exports.getAttendanceData = (req, res) => {
  const { startDate, endDate, employeeId } = req.body; // Access parameters from request body
  console.log(`Fetching attendance data for employee ${employeeId} from ${startDate} to ${endDate}`);
  getAttendanceData(startDate, endDate, employeeId, (error, results) => {
    if (error) {
      console.error("Error fetching attendance data:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }
    return res.json({ success: 1, data: results });
  });
};


exports.getDashboardData = (req, res) => {
  const { employeeId } = req.body; // Access parameters from request body

  getDashoardGraph(employeeId, (error, results) => {
    if (error) {
      console.error("Error fetching dashboard data:", error);
      return res.status(500).json({ success: 0, message: "Internal Server Error" });
    }

    // Process results to the desired format
    const dataMap = new Map();
    
    results.forEach(row => {
      const { name, hour, total_clicks } = row;
      if (!dataMap.has(name)) {
        dataMap.set(name, { name, hours: new Array(24).fill(0) }); // Initialize hours array with 24 zeros
      }
      dataMap.get(name).hours[hour] = total_clicks;
    });

    const formattedResults = Array.from(dataMap.values());

    return res.json({ success: 1, data: formattedResults });
  });
};
