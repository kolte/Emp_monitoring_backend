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

    // Convert created_at and updated_at to date objects
    const startDate = new Date(created_at);
    const endDate = new Date(updated_at);

    // Define an array to hold the attendance IDs
    const attendanceIds = [];

    // Define the function to insert attendance records
    function insertAttendance(startDate, endDate) {
      // Loop through each date until the end date
      for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        // Insert data into em_employee_attendance table
        const formattedDate = currentDate.toISOString().slice(0, 10); // Format the date as "YYYY-MM-DD"
        const insertAttendanceQuery = `
          INSERT INTO em_employee_attendance 
            (employee_id, attendance_date, date_start, date_end, present, leave_approved) 
          VALUES (?, ?, NULL, NULL, 0, 0)`;

        pool.query(insertAttendanceQuery, [employee_id, formattedDate], (attendanceError, attendanceResults) => {
          if (attendanceError) {
            console.error(attendanceError);
            return callback(attendanceError);
          }

          // Retrieve the auto-generated primary key and push it to the array
          const attendanceId = attendanceResults.insertId;
          attendanceIds.push(attendanceId);

          // Insert data into em_employee_attendance_details table using the attendanceId
          let leaveDays = 0;
          let leaveHalf = 0;

          if (days === 1 && half === 1) {
            // Full day and half day
            leaveDays = 1;
            leaveHalf = 1;
          } else if (days > 1 || half === 0) {
            // Full day for multiple days or full day only
            leaveDays = 1;
          } else if (days === 0 && (half === "first" || half === "second")) {
            // Half day only
            leaveHalf = half;
          }

          const insertAttendanceDetailsQuery = `
            INSERT INTO em_employee_attendance_details 
              (employee_id, employee_attendance_id, leave_type_id, approval_user_id, leave_reason, days, half) 
            VALUES (?, ?, ?, 1, ?, ?, ?)`;

          pool.query(insertAttendanceDetailsQuery, [employee_id, attendanceId, leave_type_id, leave_reason, leaveDays, leaveHalf], (insertError, insertResults) => {
            if (insertError) {
              console.error(insertError);
              return callback(insertError);
            }
          });
        });
      }

      // Callback with the array of attendanceIds once all records are inserted
      callback(null, attendanceIds);
    }

    // Call the insertAttendance function with the start and end dates
    insertAttendance(startDate, endDate);
  },

  getLeaveTypeData: (callback) => {
    pool.query(`SELECT * FROM em_leave_type`, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  getLeaveDatesWithEmployeeDetails: (callback) => {
    const query = `
      SELECT 
        a.id as attendance_id,
        a.attendance_date,
        l.leave_name,
        d.leave_reason,
        d.days,
        d.half,
        e.id,
        e.employee_code,
        e.first_name,
        e.last_name
      FROM 
        em_employee_attendance a
      INNER JOIN 
        em_employee_attendance_details d ON a.id = d.employee_attendance_id
      INNER JOIN 
        em_leave_type  l ON l.id = d.leave_type_id        
      INNER JOIN 
        em_employee e ON a.employee_id = e.id
      WHERE 
        a.present = 0`;

    pool.query(query, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
  
};
