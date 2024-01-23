const pool = require("../../config/database");

module.exports = {
  createOrUpdateLeave: (data, callback) => {
    const {
      leave_name,
      leave_limit,
      created_at,
      updated_at,
      employee_id,
      leave_reason,
    } = data;

    // Check if attendance with the same date exists for the employee
    const checkAttendanceQuery =
      "SELECT * FROM em_leave_type WHERE employee_id = ? AND created_at = ?";
    pool.query(
      checkAttendanceQuery,
      [employee_id, created_at],
      (error, results) => {
        if (error) {
          console.error(error);
          return callback(error);
        }

        if (results.length > 0) {
          // Attendance exists, update the existing record
          const updateAttendanceQuery = `
          UPDATE em_leave_type 
          SET leave_name = ?, leave_limit = ?, created_at = ?, updated_at = ?
          WHERE employee_id = ?`;

          pool.query(
            updateAttendanceQuery,
            [leave_name, leave_limit, created_at, updated_at, employee_id],
            (updateError, updateResults) => {
              if (updateError) {
                console.error(updateError);
                return callback(updateError);
              }
              return callback(null, updateError, updateResults);
            }
          );
        } else {
          // Attendance does not exist, insert a new record with punch_in as current time
          const insertAttendanceQuery = `
          INSERT INTO em_leave_type 
          (leave_name, leave_limit, created_at, updated_at, employee_id) 
          VALUES (?, ?, ?, ?, ?)`;

          pool.query(
            insertAttendanceQuery,
            [leave_name, leave_limit, created_at, updated_at, employee_id],
            (insertError, insertResults) => {
              if (insertError) {
                return callback(insertError);
              }
              const insertAttendanceDataQuery = `
          INSERT INTO em_employee_attendance_details 
          (employee_id, employee_attendance_id, leave_type_id, approval_user_id, leave_reason,created_at,updated_at) 
          VALUES (?, 2, 19, 1, ?, ?,?)`;

              pool.query(
                insertAttendanceDataQuery,
                [employee_id, leave_reason, created_at, updated_at],
                (insertError, insertResults) => {
                  if (insertError) {
                    return callback(insertError);
                  }
                  return callback(null, insertError, insertResults);
                }
              );
            }
          );
        }
      }
    );
  },
  getLeaveTypeData: (callback) => {
    pool.query(`SELECT * FROM em_leave_type`, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
};
