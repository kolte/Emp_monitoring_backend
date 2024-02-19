const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  getUsers: (callback) => {
    // pool.query(`SELECT * FROM em_employee`, (error, results, fields) => {
    pool.query(`SELECT * FROM em_employee e LEFT JOIN em_employee_attendance_pc_screenshot d ON e.id = d.employee_id`, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
};
