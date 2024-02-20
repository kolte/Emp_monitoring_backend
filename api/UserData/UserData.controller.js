const { getUsers } = require("./UserData.service");

module.exports = {
  getUsers: (req, res) => {
    const {id} = req.query;
    getUsers(id,(err, results) => {
      if (err) {
        return res.status(500).json({
          success: 0,
          message: "Database connection error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
};
