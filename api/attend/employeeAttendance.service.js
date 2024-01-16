const pool = require('../../config/database');

module.exports = {
  createOrUpdateAttendance: (data, callback) => {
    const { employee_id, attendance_date, present, leave_approved } = data;

    // Check if attendance with the same date exists for the employee
    const checkAttendanceQuery = 'SELECT * FROM em_employee_attendance WHERE employee_id = ? AND attendance_date = ?';
    pool.query(checkAttendanceQuery, [employee_id, attendance_date], (error, results) => {
      if (error) {
        console.error(error);
        return callback(error);
      }

      if (results.length > 0) {
        // Attendance exists, update the existing record
        const updateAttendanceQuery = `
          UPDATE em_employee_attendance 
          SET date_start = NOW(), date_end = NULL, present = ?, leave_approved = ? 
          WHERE employee_id = ? AND attendance_date = ?`;

        pool.query(
          updateAttendanceQuery,
          [present, leave_approved, employee_id, attendance_date],
          (updateError, updateResults) => {
            if (updateError) {
              console.error(updateError);
              return callback(updateError);
            }

            // Get the employee_attendance_id for the updated record
            const employeeAttendanceId = results[0].id;

            // Now, handle the em_employee_attendance_punch table
            const { punch_out, total_time } = data;

            // Check if punch details exist for the employee and date
            const checkPunchDetailsQuery = `
              SELECT * FROM em_employee_attendance_punch  
              WHERE employee_id = ? AND employee_attendance_id = ? AND punch_in IS NOT NULL and punch_out IS NULL`;

            pool.query(checkPunchDetailsQuery, [employee_id, employeeAttendanceId], (punchError, punchResults) => {
              if (punchError) {
                console.error(punchError);
                return callback(punchError);
              }

              if (punchResults.length > 0) {
                // Punch details exist, update the existing record
                const updatePunchDetailsQuery = `
                  UPDATE em_employee_attendance_punch  
                  SET punch_out = NOW(), total_time = TIMESTAMPDIFF(MINUTE, punch_in, NOW()) 
                  WHERE employee_id = ? AND employee_attendance_id = ? AND punch_out IS NULL`;

                pool.query(
                  updatePunchDetailsQuery,
                  [employee_id, employeeAttendanceId],
                  (updatePunchError, updatePunchResults) => {
                    if (updatePunchError) {
                      console.error(updatePunchError);
                      return callback(updatePunchError);
                    }

                    return callback(null, updateResults, updatePunchResults);
                  }
                );
              } else {
                // Punch details do not exist, insert a new record
                const insertPunchDetailsQuery = `
                  INSERT INTO em_employee_attendance_punch  
                  (employee_id, employee_attendance_id, punch_in, punch_out) 
                  VALUES (?, ?, NOW(), NULL)`;

                pool.query(
                  insertPunchDetailsQuery,
                  [employee_id, employeeAttendanceId],
                  (insertPunchError, insertPunchResults) => {
                    if (insertPunchError) {
                      console.error(insertPunchError);
                      return callback(insertPunchError);
                    }

                    return callback(null, updateResults, insertPunchResults);
                  }
                );
              }
            });
          }
        );
      } else {
        // Attendance does not exist, insert a new record with punch_in as current time
        const insertAttendanceQuery = `
          INSERT INTO em_employee_attendance 
          (employee_id, attendance_date, date_start, date_end, present, leave_approved) 
          VALUES (?, ?, NOW(), NULL, ?, ?)`;

        pool.query(
          insertAttendanceQuery,
          [employee_id, attendance_date, present, leave_approved],
          (insertError, insertResults) => {
            if (insertError) {
              console.error(insertError);
              return callback(insertError);
            }

            // Get the employee_attendance_id for the newly inserted record
            const employeeAttendanceId = insertResults.insertId;

            // Now, handle the em_employee_attendance_punch table for insert case
            const insertPunchDetailsQuery = `
              INSERT INTO em_employee_attendance_punch  
              (employee_id, employee_attendance_id, punch_in, punch_out) 
              VALUES (?, ?, NOW(), NULL)`;

            pool.query(
              insertPunchDetailsQuery,
              [employee_id, employeeAttendanceId],
              (insertPunchError, insertPunchResults) => {
                if (insertPunchError) {
                  console.error(insertPunchError);
                  return callback(insertPunchError);
                }

                return callback(null, insertResults, insertPunchResults);
              }
            );
          }
        );
      }
    });
  },
};
