const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO em_employee_attendance_pc_screenshot (employee_id, employee_attendance_id, screenshot_url, screenshot_time) VALUES (?, ?, ?, ?)`,
      [data.employee_id, data.employee_attendance_id, data.fullUrl, new Date()],
      (error, results, fields) => {
        if (error) {
          console.log(error);
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
