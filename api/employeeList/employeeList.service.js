const bcrypt = require("bcrypt");
const pool = require("../../config/database");


    // d1.screenshot_url AS screenshot_a,
    // d2.screenshot_url AS screenshot_b,
    // d3.screenshot_url AS screenshot_c,
    // d4.screenshot_url AS screenshot_d
    
// LEFT JOIN (
//     SELECT 
//         *,
//         ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
//     FROM 
//         em_employee_attendance_pc_screenshot
// ) AS d1 ON e.id = d1.employee_id AND d1.row_num = 1
// LEFT JOIN (
//     SELECT 
//         *,
//         ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
//     FROM 
//         em_employee_attendance_pc_screenshot
// ) AS d2 ON e.id = d2.employee_id AND d2.row_num = 2
// LEFT JOIN (
//     SELECT 
//         *,
//         ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
//     FROM 
//         em_employee_attendance_pc_screenshot
// ) AS d3 ON e.id = d3.employee_id AND d3.row_num = 3
// LEFT JOIN (
//     SELECT 
//         *,
//         ROW_NUMBER() OVER (PARTITION BY employee_id ORDER BY screenshot_time DESC) AS row_num
//     FROM 
//         em_employee_attendance_pc_screenshot
// ) AS d4 ON e.id = d4.employee_id AND d4.row_num = 4


module.exports = {
    getUsers: (employeeId, callback) => {
        let query = `SELECT 
    e.*,    
    CASE
        WHEN a.present = 1 THEN 'Present'
        ELSE 'Absent'
    END AS attendance_status,
    COALESCE(lv.total_leave_days, 0) AS total_leave_days,
    CONCAT(
        FLOOR(et.total_time / 3600), ' hours ',
        FLOOR(MOD(et.total_time, 3600) / 60), ' minutes ',
        MOD(et.total_time, 60), ' seconds'
    ) AS formatted_total_time,
    CONCAT(
        FLOOR((esb.total_break_sb * 60) / 3600), ' hours ',
        FLOOR(MOD((esb.total_break_sb * 60), 3600) / 60), ' minutes ',
        MOD((esb.total_break_sb * 60), 60), ' seconds'
    ) AS formatted_total_sb,
    CONCAT(
        FLOOR((elb.total_break_lb * 60) / 3600), ' hours ',
        FLOOR(MOD((elb.total_break_lb * 60), 3600) / 60), ' minutes ',
        MOD((elb.total_break_lb * 60), 60), ' seconds'
    ) AS formatted_total_lb,
    CONCAT(
        FLOOR(ut.up_time / 3600), ' hours ',
        FLOOR(MOD(ut.up_time, 3600) / 60), ' minutes ',
        MOD(ut.up_time, 60), ' seconds'
    ) AS formatted_total_up_time,
    CONCAT(
        FLOOR((ut.up_time - (et.total_time + IFNULL(rt.last_time, 0))) / 3600), ' hours ',
        FLOOR(MOD((ut.up_time - (et.total_time + IFNULL(rt.last_time, 0))), 3600) / 60), ' minutes ',
        MOD((ut.up_time - (et.total_time + IFNULL(rt.last_time, 0))), 60), ' seconds'
    ) AS formatted_total_break_time,
    et.total_punch_out,
    CONCAT(
        FLOOR((et.total_time + IFNULL(rt.last_time, 0)) / 3600), ' hours ',
        FLOOR(MOD((et.total_time + IFNULL(rt.last_time, 0)), 3600) / 60), ' minutes ',
        MOD((et.total_time + IFNULL(rt.last_time, 0)), 60), ' seconds'
    ) AS formatted_totaltime
FROM 
    em_employee e
LEFT JOIN em_employee_attendance a ON e.id = a.employee_id 
    AND a.present = 1 AND DATE(a.attendance_date) = CURDATE()
LEFT JOIN (
    SELECT 
        employee_id,
        SUM(present) AS total_leave_days
    FROM 
        em_employee_attendance
    WHERE 
        leave_approved = 1 AND present = 0
    GROUP BY 
        employee_id
) AS lv ON e.id = lv.employee_id
LEFT JOIN (
    SELECT 
        employee_id,
        MAX(punch_out) AS total_punch_out,
        SUM(TIMESTAMPDIFF(SECOND, punch_in, punch_out)) AS total_time
    FROM 
        em_employee_attendance_punch
    WHERE 
        DATE(punch_in) = CURDATE()
    GROUP BY 
        employee_id
) AS et ON e.id = et.employee_id
LEFT JOIN (
    SELECT 
        employee_id,
        TIMESTAMPDIFF(SECOND, MIN(punch_in), NOW()) AS up_time
    FROM 
        em_employee_attendance_punch
    WHERE 
        DATE(punch_in) = CURDATE()
    GROUP BY 
        employee_id
) AS ut ON e.id = ut.employee_id 
LEFT JOIN (
    SELECT 
        employee_id,
        TIMESTAMPDIFF(SECOND, MAX(punch_in), NOW()) AS last_time
    FROM 
        em_employee_attendance_punch
    WHERE 
        DATE(punch_in) = CURDATE() AND punch_out IS NULL
    GROUP BY 
        employee_id
) AS rt ON e.id = rt.employee_id
LEFT JOIN (
    SELECT 
        employee_id,
        SUM(total_time) AS total_break_sb
    FROM 
        em_employee_attendance_punch
    WHERE 
        DATE(punch_in) = CURDATE()
        AND break_type = 'sb'
    GROUP BY 
        employee_id
) AS esb ON e.id = esb.employee_id
LEFT JOIN (
    SELECT 
        employee_id,
        SUM(total_time) AS total_break_lb
    FROM 
        em_employee_attendance_punch
    WHERE 
        DATE(punch_in) = CURDATE()
        AND break_type = 'lb'
    GROUP BY 
        employee_id
) AS elb ON e.id = elb.employee_id`;

        if (employeeId) {
            query += ` WHERE e.id = ${employeeId}`;
        }

        pool.query(query, (error, results, fields) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },
    getEmployeeAttendanceCount: (callback) => {
        const attendanceQuery = `
    SELECT COUNT(*) AS total_count, SUM(CASE WHEN a.present = 1 THEN 1 ELSE 0 END) AS present_count, COUNT(*) - SUM(CASE WHEN a.present = 1 THEN 1 ELSE 0 END) AS absent_count, SUM(p.mouse_click)/2 + SUM(p.keyboard_click)/2 AS mouce_count FROM em_employee e LEFT JOIN em_employee_attendance a ON e.id = a.employee_id AND DATE(a.attendance_date) = CURDATE() CROSS JOIN em_employee_attendance_pc_screenshot p;
    `;

        pool.query(attendanceQuery, (error, results, fields) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results[0]);
        });
    }
};
