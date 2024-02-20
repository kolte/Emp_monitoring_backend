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
        console.log(results)
        return callback(null, results);
      }
    );
  },
};
