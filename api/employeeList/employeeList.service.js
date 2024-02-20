const bcrypt = require("bcrypt");
const pool = require("../../config/database");

module.exports = {
  getUsers: (callback) => {
    // pool.query(`SELECT * FROM em_employee`, (error, results, fields) => {
    pool.query(
      `SELECT 
    e.*,
    d1.screenshot_url AS screenshot_a,
    d2.screenshot_url AS screenshot_b,
    d3.screenshot_url AS screenshot_c,
    d4.screenshot_url AS screenshot_d
FROM 
    em_employee e
LEFT JOIN (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
    FROM 
        em_employee_attendance_pc_screenshot
) AS d1 ON e.id = d1.employee_id AND d1.row_num = 1
LEFT JOIN (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
    FROM 
        em_employee_attendance_pc_screenshot
) AS d2 ON e.id = d2.employee_id AND d2.row_num = 2
LEFT JOIN (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
    FROM 
        em_employee_attendance_pc_screenshot
) AS d3 ON e.id = d3.employee_id AND d3.row_num = 3
LEFT JOIN (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
    FROM 
        em_employee_attendance_pc_screenshot
) AS d4 ON e.id = d4.employee_id AND d4.row_num = 4;`,
      (error, results, fields) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      }
    );
  },
};
