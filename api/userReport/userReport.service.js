const pool = require("../../config/database");

exports.getUsers = (employeeId, callback) => {
  pool.query(`SELECT * FROM em_employee_attendance where employee_id= ?`, employeeId, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

exports.getUsersPunchReport = (employeeId, callback) => {
  pool.query(`SELECT * FROM em_employee_attendance_punch where employee_id= ?`, employeeId, (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

exports.getTimeReport = (employeeId,emp_date, callback) => {
  pool.query(`SELECT (SUM(e.mouse_click + e.keyboard_click)) AS mouclick, (SUM(r.total_time)) AS total_time FROM em_employee_attendance_pc_screenshot e JOIN em_employee_attendance_punch r ON e.employee_id = r.employee_id WHERE e.employee_id =? AND DATE(r.punch_in) = ?`, [employeeId, emp_date],(error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

exports.getEmployeeScreenshots = (employeeId, date, callback) => {
  const query = `
    SELECT screenshot_url, screenshot_time, active_screen, mouse_click, keyboard_click
    FROM em_employee_attendance_pc_screenshot
    WHERE employee_id = ? AND DATE(screenshot_time) = ?
  `;
  pool.query(query, [employeeId, date], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

exports.getLatestFourScreenshots = (employeeId, callback) => {
  const query = `
    SELECT screenshot_url, screenshot_time, active_screen, mouse_click, keyboard_click
    FROM em_employee_attendance_pc_screenshot
    WHERE employee_id = ?
    ORDER BY screenshot_time DESC
    LIMIT 4
  `;
  pool.query(query, [employeeId], (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};