const { getUsers } = require("./employeeList.service");

module.exports = {
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        return;
      }
      return res.json({
        success: 1,
        data: results,
      });
    });
  },
};
