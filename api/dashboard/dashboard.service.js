const moment = require('moment');
const async = require('async');
const pool = require("../../config/database");

module.exports = {
  getTotalWorkingHoursToday: (callback) => {
    const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format   
    const query = `
      SELECT SUM(total_time) AS total_minutes
      FROM em_employee_attendance_punch
      WHERE DATE(punch_in) = ?;
    `;
    pool.query(query, [today], (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      // Get the total minutes from the query result
      const totalMinutes = results[0].total_minutes || 0;

      // Convert minutes to hours
      const totalHours = totalMinutes / 60;

      // Return the total hours
      return callback(null, totalHours);
    });
  },

  getTotalWorkingHoursThisMonth: (callback) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // January is 0 in JavaScript

    const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0);
    
    const firstDay = firstDayOfMonth.toISOString().slice(0, 10);
    const lastDay = lastDayOfMonth.toISOString().slice(0, 10);
    
    const query = `
      SELECT SUM(total_time) AS total_minutes
      FROM em_employee_attendance_punch
      WHERE DATE(punch_in) BETWEEN ? AND ?;
    `;
    pool.query(query, [firstDay, lastDay], (error, results, fields) => {
      if (error) {
        return callback(error);
      }

      const totalMinutes = results[0].total_minutes || 0;
      const totalHours = totalMinutes / 60;

      return callback(null, totalHours);
    });
  },

  compareMonthHours: (callback) => {
    const currentMonth = new Date().getMonth() + 1;
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;

    const currentYear = new Date().getFullYear();
    const previousYear = previousMonth === 12 ? currentYear - 1 : currentYear;

    const queryCurrentMonth = `
      SELECT SUM(total_time) AS total_current_month
      FROM em_employee_attendance_punch
      WHERE MONTH(punch_in) = ? AND YEAR(punch_in) = ?;
    `;
    
    const queryPreviousMonth = `
      SELECT SUM(total_time) AS total_previous_month
      FROM em_employee_attendance_punch
      WHERE MONTH(punch_in) = ? AND YEAR(punch_in) = ?;
    `;

    let totalCurrentMonth = 0;
    let totalPreviousMonth = 0;

    pool.query(queryCurrentMonth, [currentMonth, currentYear], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      totalCurrentMonth = results[0].total_current_month || 0;

      pool.query(queryPreviousMonth, [previousMonth, previousYear], (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        totalPreviousMonth = results[0].total_previous_month || 0;

        const percentageChange = (((totalCurrentMonth - totalPreviousMonth) / totalPreviousMonth) * 100).toFixed(2);
        const changeType = totalCurrentMonth > totalPreviousMonth ? 'increase' : 'decrease';

        return callback(null, {
          percentageChange: parseFloat(percentageChange),
          changeType: changeType
        });
      });
    });
  },
  compareWeekHours: (callback) => {
    const currentWeekStartDate = moment().startOf('week').toDate();
    const currentWeekEndDate = moment().endOf('week').toDate();
    const previousWeekStartDate = moment().subtract(1, 'weeks').startOf('week').toDate();
    const previousWeekEndDate = moment().subtract(1, 'weeks').endOf('week').toDate();

    const queryCurrentWeek = `
      SELECT SUM(total_time) AS total_current_week
      FROM em_employee_attendance_punch
      WHERE punch_in >= ? AND punch_in <= ?;
    `;
    
    const queryPreviousWeek = `
      SELECT SUM(total_time) AS total_previous_week
      FROM em_employee_attendance_punch
      WHERE punch_in >= ? AND punch_in <= ?;
    `;

    let totalCurrentWeek = 0;
    let totalPreviousWeek = 0;

    pool.query(queryCurrentWeek, [currentWeekStartDate, currentWeekEndDate], (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      totalCurrentWeek = results[0].total_current_week || 0;

      pool.query(queryPreviousWeek, [previousWeekStartDate, previousWeekEndDate], (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        totalPreviousWeek = results[0].total_previous_week || 0;

        const percentageChange = (((totalCurrentWeek - totalPreviousWeek) / totalPreviousWeek) * 100).toFixed(2);
        const changeType = totalCurrentWeek > totalPreviousWeek ? 'increase' : 'decrease';

        return callback(null, {
          percentageChange: parseFloat(percentageChange),
          changeType: changeType
        });
      });
    });
  }
};
