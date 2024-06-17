const pool = require("../../config/database");

exports.getMonthlyReport = (startDate, endDate, callback) => {
  const query = `
    WITH RECURSIVE DateRange AS (
      SELECT DATE_FORMAT(?, '%Y-%m-01') AS date
      UNION ALL
      SELECT DATE_ADD(date, INTERVAL 1 DAY)
      FROM DateRange
      WHERE DATE_ADD(date, INTERVAL 1 DAY) < DATE_FORMAT(DATE_ADD(?, INTERVAL 1 MONTH), '%Y-%m-01')
    )
    SELECT 
      DateRange.date AS attendance_date,
      COUNT(DISTINCT ea.employee_id) AS total_employees_present,
      (SELECT COUNT(id) FROM em_employee) AS total_employees,
      (SELECT COUNT(id) FROM em_employee) - COUNT(DISTINCT ea.employee_id) AS total_employees_absent,
      MIN(ep.punch_in) AS punch_in, 
      HOUR(SEC_TO_TIME(SUM(ep.total_time * 60))) AS total_hours,
      SUM(ep.total_time) AS total,
      SUM(CASE WHEN ea.leave_approved = 1 THEN 1 ELSE 0 END) AS total_leave_approved
    FROM DateRange
    LEFT JOIN em_employee_attendance AS ea ON DateRange.date = ea.attendance_date
    LEFT JOIN em_employee_attendance_punch AS ep ON ep.employee_attendance_id = ea.id  
    GROUP BY DateRange.date;
  `;

  pool.query(query, [startDate, endDate], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};

exports.getAttendanceData = (startDate, endDate, employeeId, callback) => {
  const query = `
WITH RECURSIVE DateRange AS (
  SELECT DATE_FORMAT(?, '%Y-%m-01') AS date -- Start date parameter
  UNION ALL
  SELECT DATE_ADD(date, INTERVAL 1 DAY)
  FROM DateRange
  WHERE DATE_ADD(date, INTERVAL 1 DAY) < DATE_FORMAT(DATE_ADD(?, INTERVAL 1 MONTH), '%Y-%m-01') -- End date parameter
)
SELECT 
  DateRange.date AS attendance_date,
  MIN(ep.punch_in) AS punch_in, 
  MAX(ep.punch_out) AS punch_out, 
  HOUR(SEC_TO_TIME(SUM(ep.total_time * 60))) AS total_hours,
  SUM(CASE WHEN ep.break_type = 'sb' THEN ep.total_time ELSE 0 END) AS total_sb,
  SUM(CASE WHEN ep.break_type = 'lb' THEN ep.total_time ELSE 0 END) AS total_lb,
  SUM(ep.total_time) AS total,
  SUM(CASE WHEN ea.leave_approved = 1 THEN 1 ELSE 0 END) AS total_leave_approved,
  CONCAT(
    FLOOR(SUM(CASE WHEN ep.break_type = 'sb' THEN ep.total_time ELSE 0 END) / 60), ' hours ',
    FLOOR(MOD(SUM(CASE WHEN ep.break_type = 'sb' THEN ep.total_time ELSE 0 END), 60)), ' minutes ',
    '0 seconds'
  ) AS formatted_total_sb, -- Short break total time formatted
  CONCAT(
    FLOOR(SUM(CASE WHEN ep.break_type = 'lb' THEN ep.total_time ELSE 0 END) / 60), ' hours ',
    FLOOR(MOD(SUM(CASE WHEN ep.break_type = 'lb' THEN ep.total_time ELSE 0 END), 60)), ' minutes ',
    '0 seconds'
  ) AS formatted_total_lb -- Long break total time formatted
FROM DateRange
LEFT JOIN em_employee_attendance AS ea 
  ON DateRange.date = ea.attendance_date AND ea.employee_id = ?
LEFT JOIN em_employee_attendance_punch AS ep 
  ON ep.employee_attendance_id = ea.id  
GROUP BY DateRange.date;


  `;

  pool.query(query, [startDate, endDate, employeeId], (error, results, fields) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
};
