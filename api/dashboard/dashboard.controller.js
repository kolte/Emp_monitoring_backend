const { getTotalWorkingHoursToday,getTotalWorkingHoursThisMonth,compareMonthHours,compareWeekHours } = require("./dashboard.service");

module.exports = {
  getTotalWorkingHoursToday: (req, res) => {
    getTotalWorkingHoursToday((err, totalWorkingHours) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Error retrieving total working hours today"
        });
      }
      return res.status(200).json({
        success: 1,
        total_working_hours: totalWorkingHours
      });
    });
  },
  getTotalWorkingHoursThisMonth: (req, res) => {
    getTotalWorkingHoursThisMonth((error, totalHours) => {
      if (error) {
        return res.status(500).json({ success: 0, message: 'Internal server error' });
      }
      return res.json({ success: 1, totalHours });
    });
  },
  compareMonthHours: (req, res) => {
    compareMonthHours((err, result) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: 'Error occurred while comparing month hours',
          error: err
        });
      }
      return res.status(200).json({
        success: 1,
        data: result
      });
    });
  },
  compareWeekHours: (req, res) => {
    compareWeekHours((err, result) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: err.message
        });
      }
      return res.status(200).json({
        success: 1,
        data: result
      });
    });
  },
};
