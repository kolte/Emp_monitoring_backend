const pool = require("../../config/database");

module.exports = {
  createOrUpdateLeave: (data, callback) => {
    const {
      leave_type_id,
      created_at,
      updated_at,
      employee_id,
      leave_reason,
      days,
      half
    } = data;

    // Check if attendance with the same date exists for the employee
    const checkAttendanceQuery =
      "SELECT * FROM em_employee_attendance_details WHERE employee_id = ? AND created_at = ?";
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
          UPDATE em_employee_attendance_details 
          SET leave_type_id = ?, leave_reason = ?, created_at = ?, updated_at = ?,days=?,half=?
          WHERE employee_id = ?`;

          pool.query(
            updateAttendanceQuery,
            [
              leave_type_id,
              leave_reason,
              created_at,
              updated_at,
              days,
              half,
              employee_id,
            ],
            (updateError, updateResults) => {
              if (updateError) {
                console.error(updateError);
                return callback(updateError);
              }
              return callback(null, updateError, updateResults);
            }
          );
        } else {
          const insertAttendanceDataQuery = `
          INSERT INTO em_employee_attendance_details 
          (employee_id, employee_attendance_id, leave_type_id, approval_user_id, leave_reason,created_at,updated_at,days,half) 
          VALUES (?, 5, ?, 1, ?, ?,?,?,?)`;

          pool.query(
            insertAttendanceDataQuery,
            [
              employee_id,
              leave_type_id,
              leave_reason,
              created_at,
              updated_at,
              days,
              half
            ],
            (insertError, insertResults) => {
              if (insertError) {
                return callback(insertError);
              }
              return callback(null, insertError, insertResults);
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
