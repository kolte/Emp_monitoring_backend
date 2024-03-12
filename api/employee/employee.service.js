const bcrypt = require('bcrypt');
const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    bcrypt.hash(data.password, 10, async (err, hashedPassword) => {
      if (err) {
        return callback(err, null);
      }

      try {
        const hashedPasswordKey = await bcrypt.hash('your_password_key', 10);
        const query = `
          INSERT INTO em_user (username, password, password_key, email, status, user_ip)
          VALUES (?, ?, ?, ?, ?, ?)
        `;

        const insertValues = [
          data.username,
          hashedPassword,
          hashedPasswordKey,
          data.email,
          data.status,
          data.user_ip
        ];

        pool.query(query, insertValues, (error, results, fields) => {
          if (error) {
            return callback(error, null);
          }
          // Get the user_id of the newly inserted user
          const userId = results.insertId;

          // Now insert into em_employee table
          const employeeQuery = `
            INSERT INTO em_employee (employee_code, first_name, last_name, middle_name, date_of_birth, gender,
              email, phone, user_id, job_id, department_id, reporting_to, salary_info, hire_date, employment_status,
              address_line1, address_line2, pin_code, city, state, work_location, emergency_contact, bank_info)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const employeeValues = [
            data.employee_code,
            data.first_name,
            data.last_name,
            data.middle_name,
            data.date_of_birth,
            data.gender,
            data.email,
            data.phone,
            userId,  // user_id from em_user
            data.job_id,
            data.department_id,
            data.reporting_to,
            data.salary_info,
            data.hire_date,
            data.employment_status,
            data.address_line1,
            data.address_line2,
            data.pin_code,
            data.city,
            data.state,
            data.work_location,
            data.emergency_contact,
            data.bank_info
          ];

          pool.query(employeeQuery, employeeValues, (employeeError, employeeResults) => {
            if (employeeError) {
              return callback(employeeError, null);
            }
            return callback(null, { userResults: results, employeeResults });
          });
        });
      } catch (error) {
        return callback(error, null);
      }
    });
  },

  getUsers: (callback) => {
    pool.query(`SELECT * FROM em_user`, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },

  updateUser: (userId, data, callback) => {
    const updateQuery = `
      UPDATE em_employee
      SET
        employee_code = ?,
        first_name = ?,
        last_name = ?,
        middle_name = ?,
        date_of_birth = ?,
        gender = ?,
        email = ?,
        phone = ?,
        job_id = ?,
        department_id = ?,
        reporting_to = ?,
        salary_info = ?,
        hire_date = ?,
        employment_status = ?,
        address_line1 = ?,
        address_line2 = ?,
        pin_code = ?,
        city = ?,
        state = ?,
        work_location = ?,
        emergency_contact = ?,
        bank_info = ?
      WHERE id = ?`;

    const updateValues = [
      data.employee_code,
      data.first_name,
      data.last_name,
      data.middle_name,
      data.date_of_birth,
      data.gender,
      data.email,
      data.phone,
      data.job_id,
      data.department_id,
      data.reporting_to,
      data.salary_info,
      data.hire_date,
      data.employment_status,
      data.address_line1,
      data.address_line2,
      data.pin_code,
      data.city,
      data.state,
      data.work_location,
      data.emergency_contact,
      data.bank_info,
      userId
    ];
// console.log(updateValues);
    pool.query(updateQuery, updateValues, (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  },
  deleteUser: (userId, callback) => {
    const deleteQuery = `DELETE FROM em_employee WHERE id = ?`;

    pool.query(deleteQuery, [userId], (error, results, fields) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};
