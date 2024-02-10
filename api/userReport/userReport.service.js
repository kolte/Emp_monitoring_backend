const bcrypt = require("bcrypt");
const pool = require("../../config/database");

module.exports = {
  getUsers: (employeeId, callback) => {
   

    pool.query(`SELECT * FROM em_employee_attendance where employee_id= ?`, employeeId, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });

  },

  getUsersPunchReport: (employeeId,callback) => {

    pool.query(`SELECT * FROM em_employee_attendance_punch where employee_id= ?`, employeeId, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
};
