const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  getUserByUsername: async (username, employeeId) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT *, em_employee.id AS employeeId, em_user.id AS userId, em_roles.id AS roleId, em_roles.role_name AS roleName 
      FROM em_user 
      INNER JOIN em_employee ON em_user.id = em_employee.user_id 
      INNER JOIN em_roles ON em_roles.id = em_employee.job_id 
      WHERE (em_user.username = ? OR em_user.email = ?) 
      LIMIT 1`;
      pool.query(query, [username, username, employeeId], (error, results) => {
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
