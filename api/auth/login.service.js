const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  getUserByUsername: async (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM em_user WHERE (username = ? OR email = ?) LIMIT 1';
      pool.query(query, [username, username], (error, results) => {
        if (error) {
          console.error('Error in getUserByUsername:', error);
          reject(error); // Reject the promise in case of an error
        } else {
          // Check if results is not empty
          const user = results && results.length > 0 ? results[0] : null;
          resolve(user);
        }
      });
    });
  },   
  validatePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};
