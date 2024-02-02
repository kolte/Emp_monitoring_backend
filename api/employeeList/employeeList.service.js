const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  getUsers: (callback) => {
    pool.query(`SELECT * FROM em_employee`, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
};
