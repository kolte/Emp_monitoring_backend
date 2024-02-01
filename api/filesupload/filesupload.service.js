const pool = require("../../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO em_employee_attendance_pc_screenshot (employee_id, employee_attendance_id, screenshot_url,active_screen,mouse_click,keyboard_click, screenshot_time) VALUES (?, ?, ?,?,?,?,?)`,
      [
        data.employee_id,
        data.employee_attendance_id,
        data.fullUrl,
        data.active_screen,
        data.mouse_click,
        data.keyboard_click,
        new Date(),
      ],
      (error, results, fields) => {
        console.log("active_screen-------", data.active_screen);
        if (error) {
          console.log(error);
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
