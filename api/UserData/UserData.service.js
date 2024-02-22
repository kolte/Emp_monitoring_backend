const bcrypt = require("bcrypt");
const pool = require("../../config/database");

module.exports = {
  getUsers: (id, callback) => {
    // pool.query(`SELECT * FROM em_employee`, (error, results, fields) => {
    pool.query(
      `SELECT * FROM em_user where id=?`,
      id,
      (error, results, fields) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      }
    );
  },
  getTimeData: (data, callback) => {
    // pool.query(`SELECT * FROM em_employee`, (error, results, fields) => {
    pool.query(
      `SELECT (SUM(TIME_TO_SEC(TIMEDIFF(punch_out, punch_in)))) AS total_time FROM em_employee_attendance_punch WHERE employee_id = ? AND DATE(punch_in) = ?`,
      [data.id,data.date],
      (error, results, fields) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      }
    );
  },
};
