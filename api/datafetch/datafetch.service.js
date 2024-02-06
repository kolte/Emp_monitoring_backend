// datafetch.service.js
const pool = require("../../config/database");

module.exports = {
  getEmployeeDetails: (callback) => {
    const query = `
      SELECT 
        e.*, 
        r.role_name AS job_title, 
        d.department_name AS department, 
        u.username AS reporting_to_username
      FROM 
        em_employee e
      JOIN 
        em_roles r ON e.job_id = r.id
      JOIN 
        em_department d ON e.department_id = d.id
      JOIN 
        em_user u ON e.reporting_to = u.id`;
    
    pool.query(query, (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  getDepartments: (callback) => {
    pool.query('SELECT * FROM em_department', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  getJobs: (callback) => {
    pool.query('SELECT * FROM em_roles', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  getUsers: (callback) => {
    pool.query('SELECT * FROM em_user', (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
};
