const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  getUserByUsername: async (username) => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM em_user WHERE username = ? LIMIT 1';
      pool.query(query, [username], (error, results) => {
        if (error) {
          console.error('Error in getUserByUsername:', error);
          resolve(null); // Return null or any default value in case of an error
        } else {
          // Check if results is an array and has at least one element
          const user = Array.isArray(results) && results.length > 0 ? results[0] : null;
          resolve(user);
        }
      });
    });
  },   
  validatePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};