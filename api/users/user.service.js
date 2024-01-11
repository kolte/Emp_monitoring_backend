const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    bcrypt.hash(data.password, 10, async (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }

      try {
        const hashedPasswordKey = await bcrypt.hash('your_password_key', 10);
        const query = `
          INSERT INTO em_user (username, password, password_key, email, status, user_ip)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
          data.username,
          hashedPassword,
          hashedPasswordKey,
          data.email,
          data.status,
          data.user_ip
        ];

        pool.query(query, insertValues, (error, results, fields) => {
          if (error) {
            return callback(error, null);
          }
          return callback(null, results);
        });
      } catch (error) {
        return callback(error, null);
      }
    });
  },

  getUsers: (callback) => {
    pool.query(`SELECT * FROM em_user`, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
};
