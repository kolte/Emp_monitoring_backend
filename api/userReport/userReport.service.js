const bcrypt = require("bcrypt");
const pool = require("../../config/database");

module.exports = {
  getUsers: (employeeId, callback) => {
    const query = `
    SELECT 
    e.*, 
    p.total_time
  FROM 
  em_employee_attendance e
  JOIN 
  em_employee_attendance_punch p ON e.employee_id = p.employee_id
  WHERE e.employee_id = ?
    `;
    pool.query(query, [employeeId], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  // getUsersPunchReport: (data,callback) => {
  //   pool.query(`SELECT * FROM em_employee_attendance where employee_attendance_id= ?`, data.attendance_date, (error, results, fields) => {
  //     if (error) {
  //       return callback(error, null);
  //     }
  //     return callback(null, results);
  //   });
  // },
};
