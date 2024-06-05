const { createOrUpdateAttendance, tokenNullAttendance, getTimeData } = require("./employeeAttendance.service");

module.exports = {
  createAttendance: (req, res) => {
    const data = req.body;
  
    getTimeData(data, (err, timeResults) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: 'Database operation error in fetching time data',
        });
      }
  
      createOrUpdateAttendance(data, (err, attendanceResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            success: 0,
            message: 'Database operation error in creating/updating attendance',
          });
        }
  
        return res.status(200).json({
          success: 1,
          attendance_data: attendanceResults,
          time_data: timeResults,
          data_sent: data,
        });
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