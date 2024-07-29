const bcrypt = require("bcrypt");
const pool = require("../../config/database");

module.exports = {
  getUsers: (id, callback) => {
    // pool.query(`SELECT * FROM em_employee`, (error, results, fields) => {
    pool.query(
      `SELECT e.*,em.profile_picture AS profile FROM em_user e JOIN em_employee em ON e.id = em.user_id  where e.id=? `,
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
      // SELECT (SUM(TIME_TO_SEC(TIMEDIFF(punch_out, punch_in)))) AS total_time FROM em_employee_attendance_punch WHERE employee_id = ? AND DATE(punch_in) = ?
    pool.query(
      `SELECT MAX(punch_out) AS total_punch_out,MIN(punch_in) AS total_punch_in,TIME_TO_SEC(TIMEDIFF(MAX(punch_out), MIN(punch_in))) AS total_time FROM em_employee_attendance_punch WHERE employee_id = ? AND DATE(punch_in) = ?`,
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
