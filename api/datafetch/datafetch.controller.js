// datafetch.controller.js
const datafetchService = require('./datafetch.service');

module.exports = {
  getEmployeeDetails: (req, res) => {
    datafetchService.getEmployeeDetails((err, results) => {
      if (err) {
        console.error('Error fetching employee details:', err);
        return res.status(500).json({
          success: 0,
          message: 'Internal server error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getDepartments: (req, res) => {
    datafetchService.getDepartments((err, results) => {
      if (err) {
        console.error('Error fetching departments:', err);
        return res.status(500).json({
          success: 0,
          message: 'Internal server error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getJobs: (req, res) => {
    datafetchService.getJobs((err, results) => {
      if (err) {
        console.error('Error fetching jobs:', err);
        return res.status(500).json({
          success: 0,
          message: 'Internal server error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getUsers: (req, res) => {
    datafetchService.getUsers((err, results) => {
      if (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({
          success: 0,
          message: 'Internal server error',
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },

  getLatestAttendance: (req, res) => {
    const { employeeId, date } = req.query;
    datafetchService.getLatestAttendance(employeeId, date, (error, result) => {
      if (error) {
        return res.status(500).json({ success: 0, message: error.message });
      }
      return res.status(200).json({ success: 1, data: result });
    });
  },
   
  getLogActivity: (req, res) => {
    const { employeeId, date,page = 0, pageSize = 15 } = req.query;
    const pageInt = parseInt(page, 10);
  const pageSizeInt = parseInt(pageSize, 10);
    datafetchService.getLogActivity(employeeId, date,pageInt, pageSizeInt, (error, result) => {
      if (error) {
        return res.status(500).json({ success: 0, message: error.message });
      }
      return res.status(200).json({ success: 1, data: result });
    });
  }
};
